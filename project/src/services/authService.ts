// src/services/authService.ts
const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

interface LoginResponse {
  token: string;
  user: any;
}

export const login = async (emailOrMobile: string, password: string) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: emailOrMobile, password }),
  });

  const data: LoginResponse = await res.json();

  if (!res.ok) throw new Error(data.message || "Login failed");

  // Save token to localStorage
  localStorage.setItem("token", data.token);

  return data;
};

export const register = async (
  name: string,
  email: string,
  mobile: string,
  password: string
) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, mobile, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");

  // Save token if returned
  if (data.token) localStorage.setItem("token", data.token);

  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
