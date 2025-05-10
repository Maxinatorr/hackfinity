import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTags } from "../contexts/TagContext";

export default function UserLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interests, setInterests] = useState([]);
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const { tags: allTags } = useTags();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      navigate("/startups");
    }
  }, [navigate]);

  function handleInterestChange(tag) {
    setInterests((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    if (isSignup) {
      if (interests.length === 0) {
        setError("Please select at least one interest.");
        return;
      }
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      if (Object.values(users).some((u) => u.email === email)) {
        setError("User already exists.");
        return;
      }
      const userId = Date.now().toString();
      users[userId] = { email, password, interests };
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("userId", userId);
      navigate("/startups");
    } else {
      // Login
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      const found = Object.entries(users).find(
        ([id, u]) => u.email === email && u.password === password
      );
      if (found) {
        localStorage.setItem("userId", found[0]);
        navigate("/startups");
      } else {
        setError("Invalid credentials.");
      }
    }
  }

  return (
    <div className="card" style={{ maxWidth: 400, margin: "3rem auto" }}>
      <h2>{isSignup ? "User Signup" : "User Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {isSignup && (
          <div style={{ margin: "10px 0" }}>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>Select your interests:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, maxHeight: 120, overflowY: "auto" }}>
              {allTags.map(tag => (
                <label key={tag} style={{ fontSize: "0.95em", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={interests.includes(tag)}
                    onChange={() => handleInterestChange(tag)}
                    style={{ marginRight: 4 }}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
        )}
        <button type="submit" style={{ width: "100%", marginTop: 8 }}>
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      <div style={{ marginTop: 16, textAlign: "center" }}>
        {isSignup ? (
          <>
            Already have an account?{" "}
            <button
              onClick={() => {
                setIsSignup(false);
                setError("");
              }}
              style={{ color: "#2563eb", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: 0 }}
            >
              Login here
            </button>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <button
              onClick={() => {
                setIsSignup(true);
                setError("");
              }}
              style={{ color: "#2563eb", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: 0 }}
            >
              Sign up here
            </button>
          </>
        )}
      </div>
    </div>
  );
}
