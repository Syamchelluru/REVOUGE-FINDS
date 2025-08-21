// src/services/authService.ts
const API_URL = "http://localhost:5000/api/auth";

export const login = async (emailOrMobile: string, password: string) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: emailOrMobile, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};

export const register = async (name: string, email: string, mobile: string, password: string) => {
  const res = await fetch(`${API_URL}/signup`, {  // <-- changed here to /signup
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, mobile, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
};
