import React, { useState } from "react";

export default function FeedbackModal({ open, onClose, onSubmit, startup, user }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmit({ user: user?.username || "Anonymous", rating, comment });
    setRating(5);
    setComment("");
    onClose();
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.4)",
        zIndex: 1200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 8,
          maxWidth: 400,
          minWidth: 280,
          padding: 24,
          position: "relative",
          boxShadow: "0 4px 24px rgba(0,0,0,0.2)"
        }}
        onClick={e => e.stopPropagation()}
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
        <h3>Leave Feedback for {startup.company}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ margin: "10px 0" }}>
            <label>
              Rating:{" "}
              <select value={rating} onChange={e => setRating(Number(e.target.value))}>
                {[5,4,3,2,1].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              /5
            </label>
          </div>
          <textarea
            placeholder="Your feedback..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={3}
            style={{ width: "100%", borderRadius: 4, borderColor: "#d1d5db", padding: 8 }}
          />
          <button type="submit" style={{ width: "100%", marginTop: 10 }}>Submit</button>
        </form>
      </div>
    </div>
  );
}
