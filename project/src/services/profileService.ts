// src/services/profileService.ts
import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/auth/profile`;

const getToken = () => localStorage.getItem("token") || "";

export const getProfile = async () => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");

  const response = await axios.get(API_BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProfile = async (updatedData: any) => {
  const token = getToken();
  if (!token) throw new Error("No token found. Please login.");

  const response = await axios.put(API_BASE_URL, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
