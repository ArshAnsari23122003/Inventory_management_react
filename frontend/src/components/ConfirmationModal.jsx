// src/components/ConfirmationModal.jsx
import React from "react";

export default function ConfirmationModal({ text, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded shadow-md p-6 w-[300px]">
        <p className="mb-4 text-center">{text}</p>
        <div className="flex justify-center gap-4">
          <button onClick={onConfirm} className="btn-red">Yes</button>
          <button onClick={onCancel} className="btn-gray">No</button>
        </div>
      </div>
    </div>
  );
}
