import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/auth/profile`
  : "http://localhost:5000/api/auth/profile";

const getToken = () => localStorage.getItem("token") || "";

// Helper for error handling
const handleError = (error: any) => {
  console.error("Profile Service Error:", error.response?.data || error.message);
  return { success: false, message: error.response?.data?.message || "Something went wrong" };
};

// Get profile
export const getProfile = async () => {
  try {
    const response = await axios.get(API_BASE_URL, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// Update profile
export const updateProfile = async (updatedData: any) => {
  try {
    const response = await axios.put(API_BASE_URL, updatedData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error);
  }
};
