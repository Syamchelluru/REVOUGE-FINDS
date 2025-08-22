// src/services/addressService.ts
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/address`;

const getToken = () => localStorage.getItem("token") || "";

// Get all addresses
export const getAddresses = async () => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");

  try {
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, addresses: res.data.addresses || [] };
  } catch (error: any) {
    console.error("Error fetching addresses:", error.response?.data || error.message);
    return { success: false, addresses: [], message: error.response?.data?.message };
  }
};

// Add new address
export const addAddress = async (address: any) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");

  try {
    const res = await axios.post(API_URL, address, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, addresses: res.data.addresses || [] };
  } catch (error: any) {
    console.error("Error adding address:", error.response?.data || error.message);
    return { success: false, addresses: [], message: error.response?.data?.message };
  }
};

// Update address
export const updateAddress = async (id: string, address: any) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");

  try {
    const res = await axios.put(`${API_URL}/${id}`, address, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, addresses: res.data.addresses || [] };
  } catch (error: any) {
    console.error("Error updating address:", error.response?.data || error.message);
    return { success: false, addresses: [], message: error.response?.data?.message };
  }
};

// Delete address
export const deleteAddress = async (id: string) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");

  try {
    const res = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, addresses: res.data.addresses || [] };
  } catch (error: any) {
    console.error("Error deleting address:", error.response?.data || error.message);
    return { success: false, addresses: [], message: error.response?.data?.message };
  }
};

// Set default address
export const setDefaultAddress = async (id: string) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");

  try {
    const res = await axios.patch(`${API_URL}/${id}/default`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { success: true, addresses: res.data.addresses || [] };
  } catch (error: any) {
    console.error("Error setting default address:", error.response?.data || error.message);
    return { success: false, addresses: [], message: error.response?.data?.message };
  }
};
