const Address = require("../../models/Address");

// ➕ Add new address (max 5 per user)
exports.addAddress = async (req, res) => {
  try {
    const { fullName, mobile, street, village, pincode } = req.body;

    // Validation
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({ success: false, message: "Invalid mobile number" });
    }
    if (!/^\d{6}$/.test(pincode)) {
      return res.status(400).json({ success: false, message: "Pincode must be 6 digits" });
    }

    const count = await Address.countDocuments({ user: req.user.id });
    if (count >= 5) {
      return res.status(400).json({ success: false, message: "Maximum 5 addresses allowed." });
    }

    let isDefault = count === 0; // first address is default

    const address = new Address({
      user: req.user.id,
      fullName,
      mobile,
      street,
      village,
      pincode,
      isDefault,
    });

    await address.save();
    const addresses = await Address.find({ user: req.user.id }).sort({ isDefault: -1, createdAt: -1 });

    res.status(201).json({ success: true, message: "Address added", addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to add address", error: err.message });
  }
};

// 📋 Get all addresses of logged-in user
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id }).sort({ isDefault: -1, createdAt: -1 });
    res.json({ success: true, addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch addresses", error: err.message });
  }
};

// ✏️ Update address
exports.updateAddress = async (req, res) => {
  try {
    const address = await Address.findOne({ _id: req.params.id, user: req.user.id });
    if (!address) return res.status(404).json({ success: false, message: "Address not found" });

    const { fullName, mobile, street, village, pincode } = req.body;

    if (mobile && !/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({ success: false, message: "Invalid mobile number" });
    }
    if (pincode && !/^\d{6}$/.test(pincode)) {
      return res.status(400).json({ success: false, message: "Pincode must be 6 digits" });
    }

    if (fullName) address.fullName = fullName;
    if (mobile) address.mobile = mobile;
    if (street) address.street = street;
    if (village) address.village = village;
    if (pincode) address.pincode = pincode;

    await address.save();
    const addresses = await Address.find({ user: req.user.id }).sort({ isDefault: -1, createdAt: -1 });
    res.json({ success: true, message: "Address updated", addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update address", error: err.message });
  }
};

// 🗑️ Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!address) return res.status(404).json({ success: false, message: "Address not found" });

    // if deleted one was default, set another as default
    if (address.isDefault) {
      const another = await Address.findOne({ user: req.user.id });
      if (another) {
        another.isDefault = true;
        await another.save();
      }
    }

    const addresses = await Address.find({ user: req.user.id }).sort({ isDefault: -1, createdAt: -1 });
    res.json({ success: true, message: "Address deleted", addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete address", error: err.message });
  }
};

// ⭐ Set default address
exports.setDefaultAddress = async (req, res) => {
  try {
    const address = await Address.findOne({ _id: req.params.id, user: req.user.id });
    if (!address) return res.status(404).json({ success: false, message: "Address not found" });

    // unset old default
    await Address.updateMany({ user: req.user.id }, { $set: { isDefault: false } });

    address.isDefault = true;
    await address.save();

    const addresses = await Address.find({ user: req.user.id }).sort({ isDefault: -1, createdAt: -1 });
    res.json({ success: true, message: "Default address updated", addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to set default address", error: err.message });
  }
};
