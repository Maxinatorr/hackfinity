import React, { createContext, useContext, useState, useEffect } from "react";

const TagContext = createContext();

export function TagProvider({ children }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    function getAllTags() {
      const companies = JSON.parse(localStorage.getItem("companies") || "{}");
      let startupTags = [];
      Object.values(companies).forEach(c => {
        if (c.tags) startupTags.push(...c.tags);
      });
      if (startupTags.length === 0) {
        startupTags = [
          "Networking", "Security", "SaaS", "AI", "Speech Recognition", "Voice AI", "Data Annotation", "Machine Learning",
          "HealthTech", "IoT", "Baby Care", "Fundraising", "Nonprofit", "Energy", "Analytics", "Marketing", "Personalization",
          "Content", "Writing", "Insurtech", "Insurance", "FoodTech", "Supply Chain", "Sustainability", "Fintech", "Personal Finance",
          "Telemedicine", "AgriTech", "Learning", "EdTech", "Logistics", "ArtTech", "Marketplace"
        ];
      }
      setTags(Array.from(new Set(startupTags)));
    }
    getAllTags();
    window.addEventListener("storage", getAllTags);
    return () => window.removeEventListener("storage", getAllTags);
  }, []);

  function refreshTags() {
    const companies = JSON.parse(localStorage.getItem("companies") || "{}");
    let startupTags = [];
    Object.values(companies).forEach(c => {
      if (c.tags) startupTags.push(...c.tags);
    });
    setTags(Array.from(new Set(startupTags)));
  }

  return (
    <TagContext.Provider value={{ tags, refreshTags }}>
      {children}
    </TagContext.Provider>
  );
}

export function useTags() {
  return useContext(TagContext);
}
