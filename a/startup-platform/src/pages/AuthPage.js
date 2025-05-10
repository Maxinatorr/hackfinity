import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTags } from "../contexts/TagContext";

export default function AuthPage() {
  const [mode, setMode] = useState("user"); // "user" or "startup"
  const [isSignup, setIsSignup] = useState(false);

  // Shared fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // User-specific
  const [username, setUsername] = useState("");
  const [userInterests, setUserInterests] = useState([]);
  // Startup-specific
  const [company, setCompany] = useState("");
  const [companyDesc, setCompanyDesc] = useState("");
  const [companyTags, setCompanyTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { tags: allTags, refreshTags } = useTags();

  useEffect(() => {
    setError("");
    setEmail(""); setPassword("");
    setUsername("");
    setUserInterests([]);
    setCompany(""); setCompanyDesc("");
    setCompanyTags([]);
    setTagInput("");
  }, [mode, isSignup]);

  function handleInterestChange(tag) {
    setUserInterests((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  }

  function handleAddTag(e) {
    e.preventDefault();
    const t = tagInput.trim();
    if (t && !companyTags.includes(t)) {
      setCompanyTags([...companyTags, t]);
      setTagInput("");
    }
  }

  function handleRemoveTag(tag) {
    setCompanyTags(companyTags.filter(t => t !== tag));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (mode === "startup") {
      if (isSignup) {
        if (!company || !companyDesc || !email || !password) {
          setError("Fill all fields.");
          return;
        }
        const companies = JSON.parse(localStorage.getItem("companies") || "{}");
        if (Object.values(companies).some((c) => c.email === email)) {
          setError("Company with this email already exists.");
          return;
        }
        const newCompanyId = Date.now().toString();
        companies[newCompanyId] = {
          company,
          description: companyDesc,
          email,
          password,
          tags: companyTags,
          products: []
        };
        localStorage.setItem("companies", JSON.stringify(companies));
        localStorage.setItem("companyId", newCompanyId);
        refreshTags();
        navigate(`/dashboard/${newCompanyId}`);
      } else {
        if (!email || !password) {
          setError("Enter email and password.");
          return;
        }
        const companies = JSON.parse(localStorage.getItem("companies") || "{}");
        const found = Object.entries(companies).find(
          ([id, c]) => c.email === email && c.password === password
        );
        if (found) {
          localStorage.setItem("companyId", found[0]);
          navigate(`/dashboard/${found[0]}`);
        } else {
          setError("Invalid credentials.");
        }
      }
    } else {
      // User
      if (isSignup) {
        if (!username || !email || !password || userInterests.length === 0) {
          setError("Fill all fields and select at least one interest.");
          return;
        }
        const users = JSON.parse(localStorage.getItem("users") || "{}");
        if (Object.values(users).some((u) => u.email === email)) {
          setError("User already exists.");
          return;
        }
        const userId = Date.now().toString();
        users[userId] = { username, email, password, interests: userInterests };
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("userId", userId);
        navigate("/startups");
      } else {
        if (!email || !password) {
          setError("Enter email and password.");
          return;
        }
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
  }

  return (
    <div className="card" style={{ maxWidth: 480, margin: "3rem auto" }}>
      {/* Switch for User/Startup */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 16 }}>
        <button
          onClick={() => { setMode("user"); setIsSignup(false); }}
          style={{
            background: mode === "user" ? "#e0e7ff" : "transparent",
            color: "#222",
            border: "1px solid #e5e7eb",
            borderRadius: 4,
            padding: "6px 18px",
            fontWeight: 500,
            fontSize: "1em",
            cursor: "pointer"
          }}
        >
          User
        </button>
        <button
          onClick={() => { setMode("startup"); setIsSignup(false); }}
          style={{
            background: mode === "startup" ? "#e0e7ff" : "transparent",
            color: "#222",
            border: "1px solid #e5e7eb",
            borderRadius: 4,
            padding: "6px 18px",
            fontWeight: 500,
            fontSize: "1em",
            cursor: "pointer"
          }}
        >
          Startup
        </button>
      </div>
      <h2 style={{ textAlign: "center" }}>
        {isSignup
          ? (mode === "startup" ? "Startup Signup" : "User Signup")
          : (mode === "startup" ? "Startup Login" : "User Login")}
      </h2>
      <form onSubmit={handleSubmit}>
        {mode === "startup" && isSignup && (
          <>
            <input
              placeholder="Company Name"
              value={company}
              onChange={e => setCompany(e.target.value)}
              required
            />
            <textarea
              placeholder="Company Description"
              rows={3}
              value={companyDesc}
              onChange={e => setCompanyDesc(e.target.value)}
              style={{ width: "100%", marginBottom: "1rem", borderRadius: 4, borderColor: "#d1d5db", padding: 8 }}
              required
            />
          </>
        )}
        {mode === "user" && isSignup && (
          <input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        )}
        <input
          placeholder={mode === "startup" ? "Company Email" : "User Email"}
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
        {mode === "user" && isSignup && (
          <div style={{ margin: "10px 0" }}>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>Select your interests:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, maxHeight: 120, overflowY: "auto" }}>
              {allTags.map(tag => (
                <label key={tag} style={{ fontSize: "0.95em", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={userInterests.includes(tag)}
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
          {isSignup
            ? (mode === "startup" ? "Sign Up as Startup" : "Sign Up as User")
            : (mode === "startup" ? "Login as Startup" : "Login as User")}
        </button>
      </form>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      <div style={{ marginTop: 16, textAlign: "center" }}>
        {isSignup ? (
          <>
            Already have an account?{" "}
            <button
              onClick={() => { setIsSignup(false); setError(""); }}
              style={{ color: "#2563eb", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: 0 }}
            >
              Login here
            </button>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <button
              onClick={() => { setIsSignup(true); setError(""); }}
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
