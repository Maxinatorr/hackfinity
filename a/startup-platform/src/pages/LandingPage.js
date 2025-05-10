import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "#f9fafb"
      }}
    >
      <div>
        <h1 style={{ marginBottom: 18, fontSize: "2.5rem", fontWeight: 700 }}>
          Welcome to Launch Nest
        </h1>
        <p style={{ fontSize: "1.3rem", marginBottom: 36, color: "#555" }}>
          Discover, connect, and grow with innovative startups!
        </p>
        <Link
          to="/startups"
          style={{
            padding: "14px 36px",
            background: "#2563eb",
            color: "#fff",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "1.1rem",
            boxShadow: "0 2px 12px rgba(37,99,235,0.08)",
            transition: "background 0.2s"
          }}
        >
          Browse Startups
        </Link>
      </div>
    </div>
  );
}
