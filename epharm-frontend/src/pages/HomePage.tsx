import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", paddingTop: "10vh", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: 36, marginBottom: 24 }}>Welcome to e-pharm</h1>
      <p style={{ fontSize: 18, marginBottom: 40 }}>Choose an option below to continue</p>
      <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "12px 24px",
            fontSize: 16,
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register/patient")}
          style={{
            padding: "12px 24px",
            fontSize: 16,
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Register as Patient
        </button>
        <button
          onClick={() => navigate("/register/doctor/basic")}
          style={{
            padding: "12px 24px",
            fontSize: 16,
            backgroundColor: "#17a2b8",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Register as Doctor
        </button>
        <button
          onClick={() => navigate("/register/pharmacy")}
          style={{
            padding: "12px 24px",
            fontSize: 16,
            backgroundColor: "#ffc107",
            color: "#000",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Register as Pharmacy
        </button>
      </div>
    </div>
  );
}