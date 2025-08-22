import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/address`
  : "http://localhost:5000/api/address";

const getToken = () => localStorage.getItem("token") || "";

// Helper function for error handling
const handleError = (error: any) => {
  console.error("Address Service Error:", error.response?.data || error.message);
  return { success: false, message: error.response?.data?.message || "Something went wrong", addresses: [] };
};

// Get all addresses
export const getAddresses = async () => {
  try {
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return { success: true, addresses: res.data.addresses || [] };
  } catch (error) {
    return handleError(error);
  }
};

// Add new address
export const addAddress = async (address: any) => {
  try {
    const res = await axios.post(API_URL, address, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return { success: true, addresses: res.data.addresses || [] };
  } catch (error) {
    return handleError(error);
  }
};

// Update address
export const updateAddress = async (id: string, address: any) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, address, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return { success: true, addresses: res.data.addresses || [] };
  } catch (error) {
    return handleError(error);
  }
};

// Delete address
export const deleteAddress = async (id: string) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return { success: true, addresses: res.data.addresses || [] };
  } catch (error) {
    return handleError(error);
  }
};

// Set default address
export const setDefaultAddress = async (id: string) => {
  try {
    const res = await axios.patch(`${API_URL}/${id}/default`, {}, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return { success: true, addresses: res.data.addresses || [] };
  } catch (error) {
    return handleError(error);
  }
};
