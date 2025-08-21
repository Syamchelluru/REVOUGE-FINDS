import React, { useState, useEffect } from "react";
import { getAddresses, deleteAddress, setDefaultAddress } from "../services/addressService";

interface Address {
  _id: string;
  fullName: string;
  street: string;
  village: string;
  pincode: string;
  mobile: string;
  isDefault?: boolean;
}

const SavedAddress: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  // Fetch addresses on page load
  const fetchAddresses = async () => {
    const res = await getAddresses();
    if (res.success) setAddresses(res.addresses);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deleteAddress(id);
    if (res.success) setAddresses(res.addresses);
  };

  const handleSetDefault = async (id: string) => {
    const res = await setDefaultAddress(id);
    if (res.success) setAddresses(res.addresses);
  };

  return (
    <div className="container mt-4">
      <h2>Saved Addresses</h2>
      {addresses.length === 0 ? (
        <p>No saved addresses found.</p>
      ) : (
        <div className="row">
          {addresses.map((addr) => (
            <div key={addr._id} className="col-12 col-md-6 mb-3">
              <div className={`card ${addr.isDefault ? "border-primary" : ""}`}>
                <div className="card-body">
                  <h5 className="card-title">{addr.fullName} {addr.isDefault && <span className="badge bg-primary">Default</span>}</h5>
                  <p className="card-text">
                    {addr.street}, {addr.village}, {addr.pincode}<br/>
                    Mobile: {addr.mobile}
                  </p>
                  <div className="d-flex gap-2">
                    {!addr.isDefault && (
                      <button className="btn btn-sm btn-outline-primary" onClick={() => handleSetDefault(addr._id)}>Set Default</button>
                    )}
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(addr._id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedAddress;
