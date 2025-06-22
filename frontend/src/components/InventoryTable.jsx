import React, { useState } from "react";
import api from "../utils/api"; // Axios instance
import ConfirmationModal from "./ConfirmationModal"; // Shows "Are you sure?" before delete
import ItemForm from "./ItemForm"; // Add/Edit form

export default function InventoryTable({ items, refresh }) {
  const [confirmItem, setConfirmItem] = useState(null); // For delete
  const [formItem, setFormItem] = useState(null); // For edit/add

  // Handle deletion
  async function deleteItem(id) {
    try {
      await api.delete(`/items/${id}`);
      refresh(); // Reload inventory after deletion
    } catch (err) {
      alert("Failed to delete item");
    }
    setConfirmItem(null);
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Item ID</th>
            <th className="border p-2">Company</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Min Level</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            // Determine background color based on stock
            let rowColor = "";
            if (item.quantity <= item.minLevel / 2) rowColor = "bg-red-100";
            else if (item.quantity <= item.minLevel) rowColor = "bg-yellow-100";
            else rowColor = "bg-green-100";

            return (
              <tr key={item._id} className={rowColor}>
                <td className="border p-2 text-center">{item.itemId}</td>
                <td className="border p-2 text-center">{item.company}</td>
                <td className="border p-2 text-center">{item.quantity}</td>
                <td className="border p-2 text-center">{item.minLevel}</td>
                <td className="border p-2 text-center space-x-2">
                  <button
                    onClick={() => setFormItem(item)}
                    className="btn-blue"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setConfirmItem(item)}
                    className="btn-red"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4">
        <button
          onClick={() => setFormItem({})}
          className="btn-green"
        >
          ➕ Add New Item
        </button>
      </div>

      {/* Show form for Add/Edit */}
      {formItem && (
        <ItemForm
          item={formItem}
          onClose={() => {
            setFormItem(null);
            refresh();
          }}
        />
      )}

      {/* Show confirmation modal for delete */}
      {confirmItem && (
        <ConfirmationModal
          text={`Are you sure you want to delete "${confirmItem.itemId}"?`}
          onConfirm={() => deleteItem(confirmItem._id)}
          onCancel={() => setConfirmItem(null)}
        />
      )}
    </div>
  );
}
