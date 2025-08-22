const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/auth`
  : "http://localhost:5000/api/auth";

// Login
export const login = async (emailOrMobile: string, password: string) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailOrMobile, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    return { success: true, data };
  } catch (error: any) {
    console.error("Login Error:", error.message);
    return { success: false, message: error.message || "Login failed" };
  }
};

// Register
export const register = async (name: string, email: string, mobile: string, password: string) => {
  try {
    const res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, mobile, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    return { success: true, data };
  } catch (error: any) {
    console.error("Registration Error:", error.message);
    return { success: false, message: error.message || "Registration failed" };
  }
};
