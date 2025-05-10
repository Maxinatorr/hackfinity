import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTags } from "../contexts/TagContext";

export default function SignupPage() {
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { tags: allTags, refreshTags } = useTags();

  function handleAddTag(e) {
    e.preventDefault();
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput("");
    }
  }

  function handleSignup(e) {
    e.preventDefault();
    const companies = JSON.parse(localStorage.getItem("companies") || "{}");
    if (Object.values(companies).some((c) => c.email === email)) {
      setError("Company with this email already exists.");
      return;
    }
    if (company && description && email && password) {
      const newCompanyId = Date.now().toString();
      companies[newCompanyId] = {
        company,
        description,
        email,
        password,
        tags,
        products: []
      };
      localStorage.setItem("companies", JSON.stringify(companies));
      localStorage.setItem("companyId", newCompanyId);
      refreshTags(); // Update global tags
      navigate(`/dashboard/${newCompanyId}`);
    } else {
      setError("Please fill all fields.");
    }
  }

  return (
    <div className="card" style={{ maxWidth: 400, margin: "3rem auto" }}>
      <h2>Sign Up Your Startup</h2>
      <form onSubmit={handleSignup}>
        <input
          placeholder="Company Name"
          value={company}
          onChange={e => setCompany(e.target.value)}
        />
        <textarea
          placeholder="Company Description"
          rows={4}
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem", borderRadius: 4, borderColor: "#d1d5db", padding: 8 }}
        />
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
        <div style={{ margin: "10px 0" }}>
          <div style={{ fontWeight: 500, marginBottom: 4 }}>Tags (type and press Enter):</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
            {tags.map(tag => (
              <span key={tag} style={{ background: "#e0e7ff", color: "#3730a3", padding: "2px 10px", borderRadius: "12px" }}>
                {tag}
                <button type="button" onClick={() => setTags(tags.filter(t => t !== tag))} style={{ marginLeft: 4, border: "none", background: "none", color: "#3730a3" }}>×</button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleAddTag(e); }}
            placeholder="Add tag"
            style={{ width: "60%" }}
            list="tag-suggestions"
          />
          <datalist id="tag-suggestions">
            {allTags.filter(t => !tags.includes(t)).map(tag => (
              <option key={tag} value={tag} />
            ))}
          </datalist>
        </div>
        <button type="submit" style={{ width: "100%" }}>Sign Up</button>
      </form>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      <div style={{ marginTop: 16 }}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
