// src/components/ItemForm.jsx
import React, { useEffect, useState } from "react";
import api from "../utils/api";
import QRScanner from "./QRScanner";

export default function ItemForm({ item, onClose }) {
  const [form, setForm] = useState({
    itemId: "",
    company: "",
    quantity: 0,
    minLevel: 0,
  });

  useEffect(() => {
    if (item) {
      setForm({
        itemId: item.itemId || "",
        company: item.company || "",
        quantity: item.quantity || 0,
        minLevel: item.minLevel || 0,
        _id: item._id,
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "quantity" || name === "minLevel" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { _id, ...data } = form;
      if (_id) {
        await api.put(`/items/${_id}`, data);
      } else {
        await api.post("/items", data);
      }
      onClose();
    } catch (err) {
      alert("Error saving item");
    }
  };

  const handleQRScan = (scannedData) => {
    setForm((prev) => ({ ...prev, ...scannedData }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-[400px]">
        <h2 className="text-xl font-bold mb-4">{form._id ? "Edit Item" : "Add Item"}</h2>
        <input type="text" name="itemId" placeholder="Item ID" value={form.itemId} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
        <input type="text" name="company" placeholder="Company" value={form.company} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
        <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
        <input type="number" name="minLevel" placeholder="Minimum Level" value={form.minLevel} onChange={handleChange} className="w-full mb-4 p-2 border rounded" />
        
        <div className="flex gap-2 justify-end mb-4">
          <button onClick={handleSubmit} className="btn-blue">{form._id ? "Update" : "Add"}</button>
          <button onClick={onClose} className="btn-gray">Cancel</button>
        </div>

        <QRScanner onScan={handleQRScan} />
      </div>
    </div>
  );
}
