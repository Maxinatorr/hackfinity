import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Dashboard() {
  const { companyId } = useParams();
  const [company, setCompany] = useState({
    name: "",
    description: "",
    tags: [],
    products: []
  });
  const [newProd, setNewProd] = useState({ name: "", desc: "", tags: "" });

  useEffect(() => {
    const companies = JSON.parse(localStorage.getItem("companies") || "{}");
    const info = companies[companyId];
    if (info) {
      setCompany({
        name: info.company,
        description: info.description || "",
        tags: info.tags || [],
        products: info.products || []
      });
    }
  }, [companyId]);

  function handleAddProduct(e) {
    e.preventDefault();
    if (!newProd.name || !newProd.desc) return;

    const updatedProducts = [
      ...company.products,
      {
        id: Date.now(),
        name: newProd.name,
        desc: newProd.desc,
        tags: newProd.tags.split(",").map(t => t.trim()).filter(Boolean)
      }
    ];

    setCompany(prev => ({
      ...prev,
      products: updatedProducts
    }));

    // Save to localStorage
    const companies = JSON.parse(localStorage.getItem("companies") || "{}");
    companies[companyId].products = updatedProducts;
    localStorage.setItem("companies", JSON.stringify(companies));

    setNewProd({ name: "", desc: "", tags: "" });
  }

  function handleRemoveProduct(prodId) {
    const updatedProducts = company.products.filter(prod => prod.id !== prodId);
    setCompany(prev => ({
      ...prev,
      products: updatedProducts
    }));

    // Save to localStorage
    const companies = JSON.parse(localStorage.getItem("companies") || "{}");
    companies[companyId].products = updatedProducts;
    localStorage.setItem("companies", JSON.stringify(companies));
  }

  function handleDeleteCompany() {
    if (
      window.confirm(
        "Are you sure you want to delete your company and all its products? This cannot be undone."
      )
    ) {
      const companies = JSON.parse(localStorage.getItem("companies") || "{}");
      delete companies[companyId];
      localStorage.setItem("companies", JSON.stringify(companies));
      localStorage.removeItem("companyId");
      window.location.href = "/";
    }
  }

  return (
    <div>
      <h2>Company Dashboard</h2>
      <div className="card">
        <h3>{company.name}</h3>
        <p>{company.description}</p>
        <div>
          {company.tags.map(tag => (
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
      </div>
      <div className="card">
        <h4>Products & Services</h4>
        {company.products.map(prod => (
          <div key={prod.id} style={{ marginBottom: 18, position: "relative" }}>
            <strong>{prod.name}</strong>
            <p style={{ margin: "4px 0" }}>{prod.desc}</p>
            {prod.tags.map(tag => (
              <span
                key={tag}
                style={{
                  background: "#fef9c3",
                  color: "#92400e",
                  padding: "2px 8px",
                  borderRadius: "10px",
                  marginRight: 6,
                  fontSize: "0.85em"
                }}
              >
                {tag}
              </span>
            ))}
            <button
              onClick={() => handleRemoveProduct(prod.id)}
              style={{
                marginLeft: 10,
                background: "#dc2626",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "4px 10px",
                cursor: "pointer",
                position: "absolute",
                top: 0,
                right: 0
              }}
            >
              Remove
            </button>
          </div>
        ))}
        <form onSubmit={handleAddProduct} style={{ marginTop: 20 }}>
          <h5>Add Product/Service</h5>
          <input
            placeholder="Product Name"
            value={newProd.name}
            onChange={e => setNewProd({ ...newProd, name: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newProd.desc}
            onChange={e => setNewProd({ ...newProd, desc: e.target.value })}
          />
          <input
            placeholder="Tags (comma separated)"
            value={newProd.tags}
            onChange={e => setNewProd({ ...newProd, tags: e.target.value })}
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
      <div style={{ marginTop: 40, textAlign: "center" }}>
        <button
          onClick={handleDeleteCompany}
          style={{
            background: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "12px 24px",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer"
          }}
        >
          Delete Company
        </button>
      </div>
    </div>
  );
}
