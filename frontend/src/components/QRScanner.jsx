// src/components/QRScanner.jsx
import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScanner = ({ onScan }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (decodedText) => {
        try {
          const data = JSON.parse(decodedText);
          onScan(data);
        } catch {
          alert("❌ Invalid QR format. Please scan valid JSON.");
        }
      },
      (error) => {
        console.warn("QR Error:", error);
      }
    );

    return () => {
      scanner.clear().catch(err => console.error("Scanner clear error:", err));
    };
  }, [onScan]);

  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">Scan a QR Code</p>
      <div id="qr-reader" className="border rounded w-full h-60" />
    </div>
  );
};

export default QRScanner;
