import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import BrowseStartups from "./pages/BrowseStartups";
import AuthPage from "./pages/AuthPage";
import { TagProvider } from "./contexts/TagContext";

// Simple NavBar
function NavBar() {
  const loggedInStartup = !!localStorage.getItem("companyId");
  const loggedInUser = !!localStorage.getItem("userId");
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: 16, background: "#f3f4f6" }}>
      <div>
        <Link to="/" style={{ fontWeight: "bold", fontSize: "1.2em", textDecoration: "none", color: "#2563eb" }}>
          Startup Platform
        </Link>
      </div>
      <div>
        <Link to="/startups" style={{ marginRight: 16 }}>Browse Startups</Link>
        {loggedInStartup ? (
          <>
            <Link to={`/dashboard/${localStorage.getItem("companyId")}`} style={{ marginRight: 16 }}>Dashboard</Link>
            <button
              onClick={() => {
                localStorage.removeItem("companyId");
                window.location.href = "/";
              }}
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "6px 16px",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </>
        ) : loggedInUser ? (
          <button
            onClick={() => {
              localStorage.removeItem("userId");
              window.location.href = "/";
            }}
            style={{
              background: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "6px 16px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/auth" style={{ fontWeight: 400, color: "#555" }}>
            Login / Signup
          </Link>
        )}
      </div>
    </nav>
  );
}

function ProtectedRoute({ children }) {
  if (!localStorage.getItem("companyId")) return <Navigate to="/auth" />;
  return children;
}

function App() {
  return (
    <TagProvider>
      <Router>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/dashboard/:companyId"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/startups" element={<BrowseStartups />} />
          </Routes>
        </div>
      </Router>
    </TagProvider>
  );
}

export default App;
