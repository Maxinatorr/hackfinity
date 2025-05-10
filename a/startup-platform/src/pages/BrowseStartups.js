import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import FeedbackModal from "../components/FeedbackModal";
import { useTags } from "../contexts/TagContext";

// --- 20 Diverse Real-World Sample Startups (prices are multiples of 5/10) ---
const realSampleStartups = [
  {
    id: "aerovault",
    company: "AeroVault",
    description: "Cloud-based drone fleet management for logistics and surveillance.",
    tags: ["Drones", "Logistics", "Cloud"],
    products: [
      { id: 1, name: "Fleet Manager", desc: "Centralized drone fleet control", price: 100, unit: "/month" },
      { id: 2, name: "AeroVision", desc: "Real-time aerial analytics", price: 150, unit: "/month" },
      { id: 3, name: "Route Optimizer", desc: "AI-powered delivery routing", price: 80, unit: "/month" }
    ],
    email: "contact@aerovault.com",
    password: "sample",
  },
  {
    id: "bioforge",
    company: "BioForge",
    description: "Synthetic biology platform creating custom enzymes for industrial use.",
    tags: ["Biotech", "AI", "SaaS"],
    products: [
      { id: 1, name: "Enzyme Designer", desc: "AI-driven enzyme synthesis", price: 200, unit: "/project" },
      { id: 2, name: "BioLab Suite", desc: "Remote lab management software", price: 50, unit: "/month" }
    ],
    email: "info@bioforge.com",
    password: "sample",
  },
  {
    id: "cognify",
    company: "Cognify",
    description: "AI-powered cognitive assessment tools for HR and education.",
    tags: ["AI", "EdTech", "SaaS"],
    products: [
      { id: 1, name: "Cognitive Test Suite", desc: "Standardized cognitive tests", price: 30, unit: "/user" },
      { id: 2, name: "TalentMatch", desc: "AI-driven candidate matching", price: 100, unit: "/month" }
    ],
    email: "hello@cognify.ai",
    password: "sample",
  },
  {
    id: "driftwave",
    company: "DriftWave",
    description: "IoT platform for smart ocean monitoring and wave energy harvesting.",
    tags: ["IoT", "Energy", "Sustainability"],
    products: [
      { id: 1, name: "WaveSensor", desc: "Oceanic sensor network", price: 5000, unit: "/installation" },
      { id: 2, name: "EnergyGrid", desc: "Wave energy management", price: 1000, unit: "/month" }
    ],
    email: "contact@driftwave.com",
    password: "sample",
  },
  {
    id: "echohealth",
    company: "EchoHealth",
    description: "Telemedicine platform with AI diagnostics and remote monitoring.",
    tags: ["HealthTech", "AI", "SaaS"],
    products: [
      { id: 1, name: "Virtual Clinic", desc: "Remote consultations", price: 40, unit: "/month" },
      { id: 2, name: "AI Diagnostics", desc: "Symptom analysis and triage", price: 60, unit: "/month" },
      { id: 3, name: "Health Tracker", desc: "Wearable integration", price: 30, unit: "/month" }
    ],
    email: "support@echohealth.com",
    password: "sample",
  },
  {
    id: "flickerly",
    company: "Flickerly",
    description: "Social video platform focused on short-form creative content and AR filters.",
    tags: ["Media", "App", "Social"],
    products: [
      { id: 1, name: "Flickerly App", desc: "Video creation and sharing", price: 0, unit: "Free" },
      { id: 2, name: "AR Studio", desc: "Custom AR filter creation", price: 15, unit: "/month" }
    ],
    email: "contact@flickerly.com",
    password: "sample",
  },
  {
    id: "greengrid",
    company: "GreenGrid",
    description: "Smart grid management software for renewable energy optimization.",
    tags: ["Energy", "SaaS", "AI"],
    products: [
      { id: 1, name: "GridOptimizer", desc: "Renewable energy balancing", price: 200, unit: "/month" },
      { id: 2, name: "DemandForecast", desc: "AI-powered energy forecasting", price: 150, unit: "/month" }
    ],
    email: "info@greengrid.com",
    password: "sample",
  },
  {
    id: "hyperloopx",
    company: "HyperloopX",
    description: "Developing next-gen hyperloop transport solutions with AI safety systems.",
    tags: ["Transport", "AI", "Engineering"],
    products: [
      { id: 1, name: "Hyperloop Simulator", desc: "Transport system simulation", price: 500, unit: "/project" },
      { id: 2, name: "Safety AI", desc: "Real-time safety monitoring", price: 300, unit: "/month" }
    ],
    email: "contact@hyperloopx.com",
    password: "sample",
  },
  {
    id: "infinitex",
    company: "InfiniteX",
    description: "Blockchain-based supply chain transparency platform.",
    tags: ["Blockchain", "Supply Chain", "SaaS"],
    products: [
      { id: 1, name: "ChainTrace", desc: "Product provenance tracking", price: 100, unit: "/month" },
      { id: 2, name: "Smart Contracts", desc: "Automated agreements", price: 150, unit: "/month" }
    ],
    email: "hello@infinitex.com",
    password: "sample",
  },
  {
    id: "jetstream",
    company: "JetStream",
    description: "AI-powered logistics platform optimizing last-mile delivery.",
    tags: ["Logistics", "AI", "SaaS"],
    products: [
      { id: 1, name: "Route Planner", desc: "Dynamic routing optimization", price: 80, unit: "/month" },
      { id: 2, name: "Fleet Tracker", desc: "Real-time vehicle tracking", price: 60, unit: "/month" }
    ],
    email: "support@jetstream.com",
    password: "sample",
  },
  {
    id: "kaleidotech",
    company: "KaleidoTech",
    description: "Augmented reality platform for immersive retail experiences.",
    tags: ["AR", "Retail", "SaaS"],
    products: [
      { id: 1, name: "AR Viewer", desc: "In-store AR experiences", price: 120, unit: "/month" },
      { id: 2, name: "Virtual Try-On", desc: "Product try-on solutions", price: 150, unit: "/month" }
    ],
    email: "contact@kaleidotech.com",
    password: "sample",
  },
  {
    id: "lumina",
    company: "Lumina",
    description: "AI-driven content creation tools for marketing teams.",
    tags: ["AI", "Marketing", "SaaS"],
    products: [
      { id: 1, name: "Content Generator", desc: "Automated copywriting", price: 40, unit: "/month" },
      { id: 2, name: "Campaign Manager", desc: "Marketing automation", price: 70, unit: "/month" }
    ],
    email: "hello@lumina.com",
    password: "sample",
  },
  {
    id: "morphix",
    company: "Morphix",
    description: "3D printing platform for rapid prototyping and manufacturing.",
    tags: ["3D Printing", "Manufacturing", "SaaS"],
    products: [
      { id: 1, name: "ProtoPrint", desc: "Rapid prototyping service", price: 300, unit: "/project" },
      { id: 2, name: "BatchPrint", desc: "Small batch manufacturing", price: 1000, unit: "/batch" }
    ],
    email: "support@morphix.com",
    password: "sample",
  },
  {
    id: "neurolytics",
    company: "Neurolytics",
    description: "Neuroscience-based analytics for consumer behavior insights.",
    tags: ["AI", "Analytics", "Marketing"],
    products: [
      { id: 1, name: "BrainScan", desc: "Consumer emotion tracking", price: 150, unit: "/month" },
      { id: 2, name: "NeuroReport", desc: "Behavioral analytics", price: 100, unit: "/month" }
    ],
    email: "info@neurolytics.com",
    password: "sample",
  },
  {
    id: "omniflow",
    company: "OmniFlow",
    description: "Unified workflow automation platform for enterprises.",
    tags: ["SaaS", "Automation", "AI"],
    products: [
      { id: 1, name: "FlowBuilder", desc: "Drag-and-drop workflow builder", price: 60, unit: "/month" },
      { id: 2, name: "AutoBot", desc: "AI-powered task automation", price: 90, unit: "/month" }
    ],
    email: "contact@omniflow.com",
    password: "sample",
  },
  {
    id: "pulsewave",
    company: "PulseWave",
    description: "Wearable health monitoring with predictive analytics.",
    tags: ["HealthTech", "Wearables", "AI"],
    products: [
      { id: 1, name: "PulseBand", desc: "Wearable health tracker", price: 150, unit: "" },
      { id: 2, name: "PulseAnalytics", desc: "Health data analytics", price: 50, unit: "/month" }
    ],
    email: "support@pulsewave.com",
    password: "sample",
  },
  {
    id: "quanta",
    company: "Quanta",
    description: "Quantum computing simulation platform for researchers and developers.",
    tags: ["Quantum Computing", "Cloud", "SaaS"],
    products: [
      { id: 1, name: "QuantaSim", desc: "Quantum circuit simulation", price: 200, unit: "/month" },
      { id: 2, name: "QuantaDev", desc: "Development environment", price: 150, unit: "/month" }
    ],
    email: "hello@quanta.com",
    password: "sample",
  },
  {
    id: "ripplepay",
    company: "RipplePay",
    description: "Next-gen payment gateway with blockchain security.",
    tags: ["Fintech", "Payments", "Blockchain"],
    products: [
      { id: 1, name: "RipplePay Gateway", desc: "Secure payment processing", price: 20, unit: "/month" },
      { id: 2, name: "RipplePay Wallet", desc: "Digital wallet", price: 0, unit: "Free" }
    ],
    email: "contact@ripplepay.com",
    password: "sample",
  },
  {
    id: "skylineai",
    company: "Skyline AI",
    description: "AI-powered real estate investment analytics platform.",
    tags: ["AI", "Real Estate", "Analytics"],
    products: [
      { id: 1, name: "Investment Analyzer", desc: "Property investment insights", price: 100, unit: "/month" },
      { id: 2, name: "Market Trends", desc: "Real-time market analysis", price: 80, unit: "/month" }
    ],
    email: "info@skylineai.com",
    password: "sample",
  },
  {
    id: "terraform",
    company: "TerraForm",
    description: "Sustainable agriculture platform using IoT and AI.",
    tags: ["Agritech", "IoT", "AI"],
    products: [
      { id: 1, name: "SmartFarm", desc: "IoT-enabled farm management", price: 70, unit: "/month" },
      { id: 2, name: "CropSense", desc: "AI crop health monitoring", price: 90, unit: "/month" }
    ],
    email: "contact@terraform.com",
    password: "sample",
  },
  {
    id: "ultrawave",
    company: "UltraWave",
    description: "High-speed wireless communication technology for urban areas.",
    tags: ["Telecom", "Wireless", "AI"],
    products: [
      { id: 1, name: "UltraLink", desc: "Wireless broadband", price: 60, unit: "/month" },
      { id: 2, name: "UltraMesh", desc: "Mesh network solutions", price: 80, unit: "/month" }
    ],
    email: "support@ultrawave.com",
    password: "sample",
  },
  {
    id: "vividly",
    company: "Vividly",
    description: "AI-powered video editing and storytelling platform.",
    tags: ["AI", "Media", "SaaS"],
    products: [
      { id: 1, name: "Vividly Editor", desc: "Automated video editing", price: 25, unit: "/month" },
      { id: 2, name: "Vividly Studio", desc: "Collaborative storytelling", price: 40, unit: "/month" }
    ],
    email: "hello@vividly.com",
    password: "sample",
  },
  {
    id: "wavefront",
    company: "WaveFront",
    description: "AI-driven customer engagement platform for retail.",
    tags: ["AI", "Retail", "SaaS"],
    products: [
      { id: 1, name: "EngageAI", desc: "Personalized marketing automation", price: 70, unit: "/month" },
      { id: 2, name: "InsightDash", desc: "Customer analytics dashboard", price: 50, unit: "/month" }
    ],
    email: "contact@wavefront.com",
    password: "sample",
  }
];

const randomUsernames = [
  "alex", "jordan", "casey", "morgan", "pat", "sam", "taylor", "riley", "drew", "blake",
  "quinn", "charlie", "sky", "dev", "ash", "jamie", "lee", "remy", "jules", "kai"
];
const randomComments = [
  "Fantastic product!", "Very useful for my workflow.", "Customer support is great.",
  "Easy to use and reliable.", "Helped my business grow.", "Needs more features.",
  "The UI is clean and intuitive.", "Performance could be better.", "Highly recommended!",
  "Affordable and effective.", "Love the automation.", "The analytics are insightful.",
  "Setup was quick and easy.", "Would use again.", "A must-have for startups.",
  "Integration was seamless.", "Saved us a lot of time.", "Very innovative.",
  "Exceeded my expectations.", "Solid value for the price."
];
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randSample(arr) {
  return arr[randInt(0, arr.length - 1)];
}
function generateFeedbacks(company, n = randInt(3, 8)) {
  let usedUsers = new Set();
  let feedbacks = [];
  for (let i = 0; i < n; ++i) {
    let user;
    do { user = randSample(randomUsernames); } while (usedUsers.has(user));
    usedUsers.add(user);
    feedbacks.push({
      user,
      rating: randInt(3, 5),
      comment: randSample(randomComments),
      company
    });
  }
  return feedbacks;
}
function generateSales(products) {
  let sales = {};
  products.forEach(prod => {
    sales[prod.id] = randInt(0, 25); // up to 25 sales in last 30 mins
  });
  return sales;
}
// Add new fields if not already present
realSampleStartups.forEach(s => {
  if (!("followers" in s)) s.followers = randInt(50, 2000);
  if (!("sales" in s)) s.sales = generateSales(s.products);
  if (!("feedbacks" in s)) s.feedbacks = generateFeedbacks(s.company);
});

// Make sample startups global for NavBar profile
window.realSampleStartups = realSampleStartups;

// Helper for getting user
function getUser() {
  const userId = localStorage.getItem("userId");
  if (!userId) return null;
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  return users[userId] || null;
}
function getUserFollowed() {
  const user = getUser();
  return user?.followed || [];
}

export default function BrowseStartups() {
  const { tags: allTags } = useTags();
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [startups, setStartups] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [view, setView] = useState("all");
  const [user, setUser] = useState(getUser());
  const [followed, setFollowed] = useState(getUserFollowed());

  // Feedback modal state
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState({});

  // Contact modal state
  const [contactOpen, setContactOpen] = useState(false);
  const [contactEmail, setContactEmail] = useState("");

  useEffect(() => {
    const companies = JSON.parse(localStorage.getItem("companies") || "{}");
    const userStartups = Object.entries(companies).map(([id, info]) => ({
      id,
      ...info,
    }));
    const allStartups = [
      ...userStartups,
      ...realSampleStartups.filter(
        sample => !userStartups.some(u => u.email === sample.email)
      ),
    ];
    setStartups(allStartups);
  }, []);

  useEffect(() => {
    setUser(getUser());
    setFollowed(getUserFollowed());
    setFeedbacks(JSON.parse(localStorage.getItem("startupFeedbacks") || "{}"));
  }, [modalOpen, feedbackOpen]);

  const userInterests = user?.interests || [];

  const filtered = startups.filter((s) => {
    const matchesSearch =
      (s.company?.toLowerCase().includes(search.toLowerCase()) ||
        s.description?.toLowerCase().includes(search.toLowerCase()));
    const matchesTag = tagFilter ? (s.tags || []).includes(tagFilter) : true;
    const matchesInterest =
      view !== "interests" ||
      (userInterests.length > 0 &&
        s.tags?.some(tag => userInterests.includes(tag)));
    const matchesFollowed =
      view !== "followed" || followed.includes(s.id);
    return matchesSearch && matchesTag && matchesInterest && matchesFollowed;
  });

  // --- Comparison helpers ---
  function getAvgPrice(startup) {
    if (!startup.products || !startup.products.length) return 0;
    return Math.round(startup.products.reduce((a, b) => a + b.price, 0) / startup.products.length);
  }
  function getFollowers(startup) {
    return startup.followers || 0;
  }
  function getAvgRating(startup) {
    // Combine built-in feedbacks and user feedbacks
    const arr = (startup.feedbacks || []).concat(feedbacks[startup.id] || []);
    if (!arr.length) return null;
    return (arr.reduce((a, b) => a + (b.rating || 0), 0) / arr.length).toFixed(1);
  }
  function getFeedbackCount(startup) {
    const arr = (startup.feedbacks || []).concat(feedbacks[startup.id] || []);
    return arr.length;
  }

  const companiesWithTag = tagFilter
    ? startups.filter(s => (s.tags || []).includes(tagFilter))
    : [];

  function getBestCompanyId(companies) {
    if (!companies.length) return null;
    let maxProducts = Math.max(...companies.map(c => c.products.length));
    let maxFollowers = Math.max(...companies.map(getFollowers));
    let maxRating = Math.max(...companies.map(c => Number(getAvgRating(c) || 0)));
    let maxFeedbacks = Math.max(...companies.map(getFeedbackCount));
    let minAvgPrice = Math.min(...companies.map(getAvgPrice));
    let scores = companies.map(c => {
      let score = 0;
      if (c.products.length === maxProducts) score++;
      if (getFollowers(c) === maxFollowers) score++;
      if (Number(getAvgRating(c) || 0) === maxRating) score++;
      if (getFeedbackCount(c) === maxFeedbacks) score++;
      if (getAvgPrice(c) === minAvgPrice) score++;
      return score;
    });
    let bestScore = Math.max(...scores);
    let bestIndex = scores.indexOf(bestScore);
    return companies[bestIndex]?.id || null;
  }
  const bestCompanyId = getBestCompanyId(companiesWithTag);

  function openModal(startup) {
    setSelectedStartup(startup);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedStartup(null);
  }

  function shortDesc(desc) {
    if (!desc) return "";
    return desc.length > 100 ? desc.slice(0, 100) + "…" : desc;
  }

  function formatPrice(price, unit) {
    if (price === 0 && unit) return unit === "Free" ? "Free" : `0${unit}`;
    if (price === 0) return "Free";
    return `$${price}${unit}`;
  }

  function isFollowed(startupId) {
    return followed.includes(startupId);
  }
  function handleFollow(startupId) {
    if (!user) return;
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    const userId = localStorage.getItem("userId");
    if (!users[userId].followed) users[userId].followed = [];
    if (!users[userId].followed.includes(startupId)) {
      users[userId].followed.push(startupId);
      localStorage.setItem("users", JSON.stringify(users));
      setFollowed(users[userId].followed);
    }
  }
  function handleUnfollow(startupId) {
    if (!user) return;
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    const userId = localStorage.getItem("userId");
    users[userId].followed = (users[userId].followed || []).filter(id => id !== startupId);
    localStorage.setItem("users", JSON.stringify(users));
    setFollowed(users[userId].followed);
  }

  function handleFeedbackSubmit(feedback) {
    if (!selectedStartup) return;
    const allFeedbacks = JSON.parse(localStorage.getItem("startupFeedbacks") || "{}");
    const arr = allFeedbacks[selectedStartup.id] || [];
    allFeedbacks[selectedStartup.id] = [...arr, feedback];
    localStorage.setItem("startupFeedbacks", JSON.stringify(allFeedbacks));
    setFeedbacks(allFeedbacks);
  }

  return (
    <div>
      <h2>Browse Startups</h2>
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <input
          placeholder="Search by name or description"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
        <select value={tagFilter} onChange={e => setTagFilter(e.target.value)}>
          <option value="">All Tags</option>
          {allTags.map(tag => (
            <option key={tag}>{tag}</option>
          ))}
        </select>
      </div>
      {/* Compare Companies Panel */}
      {tagFilter && companiesWithTag.length > 0 && (
        <div style={{
          background: "#f1f5f9",
          borderRadius: 8,
          padding: 20,
          marginBottom: 28,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          overflowX: "auto"
        }}>
          <h3 style={{ marginTop: 0, marginBottom: 12 }}>
            Compare Companies with "<span style={{ color: "#2563eb" }}>{tagFilter}</span>"
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Company</th>
                <th>Products</th>
                <th>Avg Price</th>
                <th>Followers</th>
                <th>Avg Rating</th>
                <th>Feedbacks</th>
              </tr>
            </thead>
            <tbody>
              {companiesWithTag.map(c => (
                <tr key={c.id} style={{ background: c.id === bestCompanyId ? "#e0f7fa" : "transparent" }}>
                  <td style={{ fontWeight: c.id === bestCompanyId ? "bold" : "normal" }}>{c.company}</td>
                  <td>{c.products.length}</td>
                  <td>${getAvgPrice(c)}</td>
                  <td>{getFollowers(c)}</td>
                  <td>{getAvgRating(c) || "N/A"}</td>
                  <td>{getFeedbackCount(c)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {bestCompanyId && (
            <div style={{ marginTop: 12, fontWeight: "bold", color: "#2563eb" }}>
              Best overall: {companiesWithTag.find(c => c.id === bestCompanyId)?.company}
            </div>
          )}
        </div>
      )}
      {/* Toggle buttons for All/Interests/Followed */}
      <div style={{ display: "flex", gap: 10, marginBottom: 10, marginTop: 2 }}>
        <button
          onClick={() => setView("all")}
          style={{
            background: view === "all" ? "#e0e7ff" : "transparent",
            color: "#222",
            border: "1px solid #e5e7eb",
            borderRadius: 4,
            padding: "3px 14px",
            fontWeight: 400,
            fontSize: "1em",
            cursor: "pointer"
          }}
        >
          All Startups
        </button>
        {user && user.interests && user.interests.length > 0 && (
          <button
            onClick={() => setView("interests")}
            style={{
              background: view === "interests" ? "#e0e7ff" : "transparent",
              color: "#222",
              border: "1px solid #e5e7eb",
              borderRadius: 4,
              padding: "3px 14px",
              fontWeight: 400,
              fontSize: "1em",
              cursor: "pointer"
            }}
          >
            Interests
          </button>
        )}
        {user && (
          <button
            onClick={() => setView("followed")}
            style={{
              background: view === "followed" ? "#e0e7ff" : "transparent",
              color: "#222",
              border: "1px solid #e5e7eb",
              borderRadius: 4,
              padding: "3px 14px",
              fontWeight: 400,
              fontSize: "1em",
              cursor: "pointer"
            }}
          >
            Followed
          </button>
        )}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
        {filtered.map(s => (
          <div
            className="card"
            key={s.id}
            style={{ cursor: "pointer" }}
            onClick={() => openModal(s)}
          >
            <h3>{s.company}</h3>
            <p>{shortDesc(s.description)}</p>
            <div>
              {(s.tags || []).map(tag => (
                <span
                  key={tag}
                  style={{
                    background: "#e0e7ff",
                    color: "#3730a3",
                    padding: "3px 10px",
                    borderRadius: "12px",
                    marginRight: 8,
                    fontSize: "0.9em"
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 10 }}>
              <strong>Products:</strong> {s.products && s.products.length > 0 ? s.products.length : 0}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#888" }}>
            No startups found.
          </div>
        )}
      </div>
      <Modal open={modalOpen} onClose={closeModal}>
        {selectedStartup && (
          <div>
            <h2 style={{ marginTop: 0 }}>{selectedStartup.company}</h2>
            <p>{selectedStartup.description}</p>
            <div style={{ marginBottom: 10 }}>
              {selectedStartup.tags && selectedStartup.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    background: "#e0e7ff",
                    color: "#3730a3",
                    padding: "3px 10px",
                    borderRadius: "12px",
                    marginRight: 8,
                    fontSize: "0.9em"
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div>
              <strong>Products:</strong>
              {selectedStartup.products && selectedStartup.products.length > 0 ? (
                <ul style={{ marginTop: 8 }}>
                  {selectedStartup.products.map(prod => (
                    <li key={prod.id} style={{ marginBottom: 6 }}>
                      <strong>{prod.name}</strong>: {prod.desc}
                      <span style={{ marginLeft: 10, color: "#059669" }}>
                        {formatPrice(prod.price, prod.unit)}
                      </span>
                      <span style={{ marginLeft: 16, color: "#7c3aed", fontWeight: 500 }}>
                        Sales (30days): {selectedStartup.sales && selectedStartup.sales[prod.id] ? selectedStartup.sales[prod.id] : 0}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ marginTop: 8, color: "#888" }}>No products listed.</div>
              )}
            </div>
            <div style={{ marginTop: 18 }}>
              <h3>Insights</h3>
              <ul>
                <li>
                  {selectedStartup.products.length} products offered.
                </li>
                <li>
                  Average product price: ${getAvgPrice(selectedStartup)}
                </li>
                <li>
                  Tags: {selectedStartup.tags.join(", ")}
                </li>
                <li>
                  Followers: {getFollowers(selectedStartup)}
                </li>
                <li>
                  Average user rating: {getAvgRating(selectedStartup) || "N/A"}
                </li>
                <li>
                  <strong>Sales in last 30 days:</strong>
                  <ul>
                    {selectedStartup.products.map(prod => (
                      <li key={prod.id}>
                        {prod.name}: {selectedStartup.sales && selectedStartup.sales[prod.id] ? selectedStartup.sales[prod.id] : 0}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
            <div style={{ marginTop: 18 }}>
              <h3>Feedback</h3>
              {(selectedStartup.feedbacks || []).concat(feedbacks[selectedStartup.id] || []).length ? (
                <ul>
                  {(selectedStartup.feedbacks || []).concat(feedbacks[selectedStartup.id] || []).map((f, i) => (
                    <li key={i} style={{ marginBottom: 8 }}>
                      <strong>{f.user}</strong> ({f.rating}/5): {f.comment}
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ color: "#888" }}>No feedback yet.</div>
              )}
            </div>
            {user && (
              <div style={{ marginTop: 18 }}>
                {isFollowed(selectedStartup.id) ? (
                  <button
                    onClick={() => handleUnfollow(selectedStartup.id)}
                    style={{
                      background: "#fbbf24",
                      color: "#222",
                      border: "none",
                      borderRadius: 4,
                      padding: "7px 22px",
                      fontWeight: 500,
                      cursor: "pointer",
                      marginRight: 10
                    }}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow(selectedStartup.id)}
                    style={{
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      borderRadius: 4,
                      padding: "7px 22px",
                      fontWeight: 500,
                      cursor: "pointer",
                      marginRight: 10
                    }}
                  >
                    Follow
                  </button>
                )}
                <button
                  onClick={() => setFeedbackOpen(true)}
                  style={{
                    background: "#10b981",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "7px 22px",
                    fontWeight: 500,
                    cursor: "pointer",
                    marginRight: 10
                  }}
                >
                  Feedback
                </button>
                <button
                  onClick={() => {
                    setContactEmail(selectedStartup.email);
                    setContactOpen(true);
                  }}
                  style={{
                    background: "#6366f1",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "7px 22px",
                    fontWeight: 500,
                    cursor: "pointer",
                    marginTop: 10
                  }}
                >
                  Contact Us
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
      <FeedbackModal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        onSubmit={handleFeedbackSubmit}
        startup={selectedStartup || {}}
        user={user}
      />
      {/* Contact Modal */}
      {contactOpen && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={() => setContactOpen(false)}
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
              onClick={() => setContactOpen(false)}
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
            <h3>Contact This Startup</h3>
            <p style={{ fontWeight: 500, marginBottom: 12 }}>
              Email:
            </p>
            <input
              value={contactEmail}
              readOnly
              style={{
                width: "100%",
                padding: 8,
                border: "1px solid #d1d5db",
                borderRadius: 4,
                fontSize: "1em",
                marginBottom: 12
              }}
              onFocus={e => e.target.select()}
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(contactEmail);
              }}
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "7px 18px",
                fontWeight: 500,
                cursor: "pointer"
              }}
            >
              Copy Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
}