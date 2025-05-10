import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const companyId = localStorage.getItem("companyId");
    if (companyId) {
      navigate(`/dashboard/${companyId}`);
    }
  }, [navigate]);

  function handleLogin(e) {
    e.preventDefault();
    const companies = JSON.parse(localStorage.getItem("companies") || "{}");
    const foundEntry = Object.entries(companies).find(
      ([id, info]) => info.email === email && info.password === password
    );
    if (foundEntry) {
      const [foundId] = foundEntry;
      localStorage.setItem("companyId", foundId);
      navigate(`/dashboard/${foundId}`);
    } else {
      setError("No account found with that email and password.");
    }
  }

  return (
    <div className="card" style={{ maxWidth: 400, margin: "3rem auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" style={{ width: "100%" }}>Login</button>
      </form>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      <div style={{ marginTop: 16 }}>
        New here? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}
