import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserProfileModal from "./UserProfileModal";

// Helper functions
function getUser() {
  const userId = localStorage.getItem("userId");
  if (!userId) return null;
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  return users[userId] || null;
}

function getFollowedCompanies() {
  const companies = JSON.parse(localStorage.getItem("companies") || "{}");
  const startups = Object.entries(companies).map(([id, info]) => ({
    id,
    ...info,
  }));
  const user = getUser();
  if (!user || !user.followed) return [];
  // Add sample startups as well
  const realSampleStartups = window.realSampleStartups || [];
  const allStartups = [...startups, ...realSampleStartups.filter(
    sample => !startups.some(u => u.email === sample.email)
  )];
  return allStartups.filter(s => user.followed.includes(s.id));
}

function getUserFeedbacks() {
  const user = getUser();
  if (!user) return [];
  const feedbacks = JSON.parse(localStorage.getItem("startupFeedbacks") || "{}");
  const result = [];
  Object.entries(feedbacks).forEach(([startupId, arr]) => {
    arr.forEach(f => {
      if (f.user === user.username) {
        // Get company name
        let company = startupId;
        // Try to get the company name from companies/sample startups
        const companies = JSON.parse(localStorage.getItem("companies") || "{}");
        if (companies[startupId]) company = companies[startupId].company;
        else if (window.realSampleStartups) {
          const found = window.realSampleStartups.find(s => s.id === startupId);
          if (found) company = found.company;
        }
        result.push({ ...f, company });
      }
    });
  });
  return result;
}

export default function NavBar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const loggedInStartup = !!localStorage.getItem("companyId");
  const loggedInUser = !!localStorage.getItem("userId");
  const user = getUser();

  // For profile modal
  const followedCompanies = getFollowedCompanies();
  const feedbacks = getUserFeedbacks();

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: 16, background: "#f3f4f6" }}>
      <div>
        <Link to="/" style={{ fontWeight: "bold", fontSize: "1.2em", textDecoration: "none", color: "#2563eb" }}>
          Launch Nest
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
          <>
            <button
              onClick={() => setProfileOpen(true)}
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "6px 16px",
                marginRight: 10,
                cursor: "pointer"
              }}
            >
              Profile
            </button>
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
              Sign Out
            </button>
            <UserProfileModal
              open={profileOpen}
              onClose={() => setProfileOpen(false)}
              user={user}
              followedCompanies={followedCompanies}
              feedbacks={feedbacks}
            />
          </>
        ) : (
          <Link to="/auth" style={{ fontWeight: 400, color: "#555" }}>
            Login / Signup
          </Link>
        )}
      </div>
    </nav>
  );
}
