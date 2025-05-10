import React from "react";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  // Stop click events from bubbling from modal content to background
  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.4)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      onClick={onClose} // This closes the modal when background is clicked
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          maxWidth: 500,
          minWidth: 320,
          padding: 24,
          position: "relative",
          boxShadow: "0 4px 24px rgba(0,0,0,0.2)"
        }}
        onClick={stopPropagation} // Prevents closing when clicking inside modal
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 14,
            background: "transparent",
            border: "none",
            fontSize: 22,
            cursor: "pointer"
          }}
          aria-label="Close"
        >×</button>
        {children}
      </div>
    </div>
  );
}
