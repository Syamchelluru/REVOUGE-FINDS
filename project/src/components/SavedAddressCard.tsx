import React from "react";

interface AddressProps {
  address: any;
  isSelected?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
  onSetDefault?: () => void;
}

const SavedAddressCard: React.FC<AddressProps> = ({ address, isSelected, onSelect, onDelete, onSetDefault }) => {
  return (
    <div
      className={`card p-3 shadow-sm ${isSelected ? "border border-primary" : ""} ${address.isDefault ? "border border-success" : ""}`}
      onClick={onSelect}
      style={{ cursor: onSelect ? "pointer" : "default" }}
    >
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h6 className="mb-1">{address.fullName}</h6>
          <p className="mb-1">{address.street}, {address.village}, {address.pincode}</p>
          <p className="mb-1">📱 {address.mobile}</p>
          {address.isDefault && <span className="badge bg-success">Default</span>}
        </div>
        <div className="d-flex flex-column align-items-end">
          {onSetDefault && !address.isDefault && (
            <button className="btn btn-sm btn-outline-success mb-1" onClick={(e) => { e.stopPropagation(); onSetDefault(); }}>
              Set Default
            </button>
          )}
          {onDelete && (
            <button className="btn btn-sm btn-outline-danger" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedAddressCard;
