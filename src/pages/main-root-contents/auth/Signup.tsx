import React from "react";

export function Signup({ onswitch }: { onswitch: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontWeight: 610,
          marginBottom: 0,
          marginTop: 40,
          fontSize: "18px",
          color: "#000000",
        }}
      >
        Бүртгэл үүсгэх
      </h2>
      <p
        style={{
          fontWeight: "normal",
          color: "#00000066",
          fontSize: "14px",
          whiteSpace: "pre-line",
          margin: 0,
        }}
      >
        Та цаашид үргэлжлүүлэхийн тулд бүртгэл {"\n"} үүсгэх шаардлагатай
      </p>
      <div
        id="mock-login-btn"
        style={{
          width: "340px",
          padding: "12px 20px",
          marginTop: "30px",
          borderRadius: "24px",
          backgroundColor: "#f6f6f6",
          border: "0.5px solid #e0e0e0",
          fontSize: "14px",
          outline: "none",
          transition: "transform 0.2s ease-in-out",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLDivElement).style.transform = "scale(1.05)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLDivElement).style.transform = "scale(1)")
        }
      >
        <p
          style={{
            fontSize: 14,
            color: "black",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          Google бүртгүүлэх
        </p>
      </div>
      <p style={{ fontSize: "14px", color: "#00000099", margin: 0 }}>эсвэл</p>
      <input
        type="email"
        placeholder="Нэр"
        style={{
          width: "340px",
          padding: "12px 20px",
          borderRadius: "24px",
          backgroundColor: "#f6f6f6",
          border: "0.5px solid #e0e0e0",
          fontSize: "14px",
          outline: "none",
          transition: "transform 0.2s ease-in-out",
        }}
      />
      <input
        type="password"
        placeholder="Нууц үг"
        style={{
          width: "340px",
          padding: "12px 20px",
          borderRadius: "24px",
          backgroundColor: "#f6f6f6",
          border: "0.5px solid #e0e0e0",
          fontSize: "14px",
          outline: "none",
          transition: "transform 0.2s ease-in-out",
        }}
      />
      <button
        style={{
          backgroundColor: "#0BA42C",
          border: "none",
          borderRadius: "24px",
          marginTop: "16px",
          color: "white",
          width: "140px",
          padding: "10px 16px",
          fontFamily: "monospace",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "-3px -3px 4px 0px #00000040 inset",
        }}
      >
        Бүртгүүлэх
      </button>
      <p
        style={{
          fontSize: 16,
          cursor: "pointer",
          marginTop: 8,
          textDecoration: "underline",
          color: "#00000099",
        }}
        onClick={onswitch}
      >
        Нэвтрэх
      </p>
      <p
        style={{
          fontSize: "11px",
          color: "#666666ff",
          fontWeight: "bold",
          marginTop: "50px",
          whiteSpace: "pre-line",
        }}
      >
        Powered by FlowFix {"\n"}Copyright © 2025 FlowFix. All rights reserved.
      </p>
    </div>
  );
}
