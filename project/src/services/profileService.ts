import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/auth/profile`;

const getToken = () => localStorage.getItem("token") || "";

// Get profile
export const getProfile = async () => {
  const response = await axios.get(API_BASE_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

// Update profile
export const updateProfile = async (updatedData: any) => {
  const response = await axios.put(API_BASE_URL, updatedData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};
