import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { getCurrentUser } from "./utils/auth";

const App = () => {
  const [user, setUser] = useState(undefined); // undefined = still loading

  useEffect(() => {
    try {
      const currentUser = getCurrentUser();
      console.log("👤 User token:", currentUser);
      setUser(currentUser);
    } catch (error) {
      console.error("Error getting current user:", error);
      setUser(null);
    }
  }, []);

  if (user === undefined) {
    return (
      <div className="text-center text-lg text-gray-600 mt-10">
        ⏳ Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
