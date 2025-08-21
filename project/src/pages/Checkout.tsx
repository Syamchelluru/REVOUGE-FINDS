import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAddresses, addAddress, deleteAddress, setDefaultAddress } from "../services/addressService";

interface Address {
  _id?: string;
  fullName: string;
  street: string;
  village: string;
  pincode: string;
  mobile: string;
  isDefault?: boolean;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Address>({
    fullName: "",
    street: "",
    village: "",
    pincode: "",
    mobile: "",
  });

  const token = localStorage.getItem("token");

  const fetchAddresses = async () => {
    if (token) {
      const res = await getAddresses();
      if (res.success) {
        setAddresses(res.addresses);
        const defaultAddr = res.addresses.find(addr => addr.isDefault);
        if (defaultAddr) setSelectedAddress(defaultAddr);
      }
    }
  };

  useEffect(() => { fetchAddresses(); }, [token]);

  const saveAddress = async () => {
    if (addresses.length >= 5) {
      alert("You can only save up to 5 addresses.");
      return;
    }
    if (token) {
      const res = await addAddress(formData);
      if (res.success) {
        setAddresses(res.addresses);
        setShowForm(false);
        setFormData({ fullName: "", street: "", village: "", pincode: "", mobile: "" });
        const defaultAddr = res.addresses.find(addr => addr.isDefault);
        if (defaultAddr) setSelectedAddress(defaultAddr);
      } else {
        alert(res.message || "Failed to add address.");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id: string) => {
    const res = await deleteAddress(id);
    if (res.success) setAddresses(res.addresses);
  };

  const handleSetDefault = async (id: string) => {
    const res = await setDefaultAddress(id);
    if (res.success) {
      setAddresses(res.addresses);
      const defaultAddr = res.addresses.find(addr => addr.isDefault);
      if (defaultAddr) setSelectedAddress(defaultAddr);
    }
  };

  const proceedToPayment = () => {
    if (!selectedAddress) {
      alert("Please select an address before proceeding.");
      return;
    }
    navigate("/checkout/payment", { state: { selectedAddress } });
  };

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      <h4 className="mt-3">Select Delivery Address</h4>

      {addresses.length > 0 ? (
        <div className="row">
          {addresses.map(addr => (
            <div key={addr._id} className="col-12 col-md-6 mb-3">
              <div
                className={`card p-3 shadow-sm ${selectedAddress?._id === addr._id ? "border-primary border-3" : ""}`}
                onClick={() => setSelectedAddress(addr)}
                style={{ cursor: "pointer" }}
              >
                <h5>{addr.fullName}</h5>
                <p>{addr.street}, {addr.village}, {addr.pincode}</p>
                <p>Mobile: {addr.mobile}</p>
                <div className="d-flex justify-content-between mt-2">
                  <button
                    className={`btn ${addr.isDefault ? "btn-success" : "btn-outline-primary"}`}
                    onClick={(e) => { e.stopPropagation(); handleSetDefault(addr._id!); }}
                  >
                    {addr.isDefault ? "Default" : "Set as Default"}
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={(e) => { e.stopPropagation(); handleDelete(addr._id!); }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved addresses. Please add one below.</p>
      )}

      <button
        className="btn btn-primary mt-2"
        onClick={() => setShowForm(true)}
        disabled={addresses.length >= 5}
      >
        + Add New Address
      </button>

      {showForm && (
        <div className="card mt-4 p-3">
          <h5>Add New Address</h5>
          <div className="row">
            {["fullName", "street", "village", "pincode", "mobile"].map(key => (
              <div className="col-12 col-md-6 mb-2" key={key}>
                <input
                  type={key === "mobile" ? "tel" : key === "pincode" ? "number" : "text"}
                  className="form-control"
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  name={key}
                  value={(formData as any)[key]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>
          <button className="btn btn-success me-2 mt-2" onClick={saveAddress}>Save Address</button>
          <button className="btn btn-secondary mt-2" onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}

      <div className="mt-4">
        <button className="btn btn-success btn-lg" onClick={proceedToPayment} disabled={!selectedAddress}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Checkout;
