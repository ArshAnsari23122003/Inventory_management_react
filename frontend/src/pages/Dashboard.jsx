// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { logout, getCurrentUser } from "../utils/auth";
import InventoryTable from "../components/InventoryTable";
import { CSVLink } from "react-csv";
import QRScanner from "../components/QRScanner";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) navigate("/login");
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get("/items");
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch items");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleQRScan = async (data) => {
    try {
      const { itemId, quantity, brand } = data;
      if (!itemId || !quantity) {
        alert("QR code missing itemId or quantity.");
        return;
      }

      await api.put(`/items/${itemId}`, { quantity, brand });
      alert("✅ Inventory updated via QR code!");
      fetchItems(); // refresh data
    } catch (err) {
      console.error("QR update failed:", err);
      alert("❌ Could not update inventory.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Dashboard</h1>
        <button onClick={handleLogout} className="btn-red">Logout</button>
      </div>

      <div className="flex justify-between items-center mb-4 gap-4 flex-col md:flex-row">
        <QRScanner onScan={handleQRScan} />
        <CSVLink data={items} filename="inventory.csv" className="btn-green mt-4 md:mt-0">
          Download Inventory (CSV)
        </CSVLink>
      </div>

      <InventoryTable items={items} refresh={fetchItems} />
    </div>
  );
};

export default Dashboard;
