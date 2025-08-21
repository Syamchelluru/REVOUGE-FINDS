// src/services/profileService.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth/profile"; // FIXED to match backend

export const getProfile = async (token: string) => {
  const response = await axios.get(API_BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProfile = async (token: string, updatedData: any) => {
  const response = await axios.put(API_BASE_URL, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
