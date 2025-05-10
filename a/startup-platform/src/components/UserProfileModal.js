import React from "react";

export default function UserProfileModal({ open, onClose, user, followedCompanies, feedbacks }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.4)",
        zIndex: 1300,
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
          maxWidth: 420,
          minWidth: 320,
          padding: 28,
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
        <h2 style={{ marginTop: 0 }}>User Profile</h2>
        <div style={{ marginBottom: 12 }}>
          <strong>Username:</strong> {user.username}
        </div>
        <div style={{ marginBottom: 12 }}>
          <strong>Email:</strong> {user.email}
        </div>
        <div style={{ marginBottom: 12 }}>
          <strong>Interests:</strong> {user.interests ? user.interests.join(", ") : "None"}
        </div>
        <div style={{ marginBottom: 12 }}>
          <strong>Followed Companies ({followedCompanies.length}):</strong>
          <ul>
            {followedCompanies.map(c => (
              <li key={c.id}>{c.company}</li>
            ))}
          </ul>
        </div>
        <div style={{ marginBottom: 12 }}>
          <strong>Feedbacks Given ({feedbacks.length}):</strong>
          <ul>
            {feedbacks.map((f, i) => (
              <li key={i}>
                <strong>{f.company}</strong> ({f.rating}/5): {f.comment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
