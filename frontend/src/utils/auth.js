// src/utils/auth.js

export const login = (token) => {
  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem("token");
    return token ? token : null;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};
