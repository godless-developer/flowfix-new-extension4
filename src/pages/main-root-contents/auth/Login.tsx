import React from "react";

declare const chrome: any;

export function Login({
  onLogin,
  shuudLogin,
  pageswitch,
}: {
  onLogin: () => void;
  shuudLogin: () => void;
  pageswitch: () => void;
}) {
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
        Нэвтрэх
      </h2>
      <p
        style={{
          fontWeight: "normal",
          color: "#00000066",
          fontSize: "14px",
          whiteSpace: "pre-line",
          textAlign: "center",
          margin: 0,
        }}
      >
        Та нэвтрэхийн тулд {"\n"} өөрийн бүртгэл ашиглана уу
      </p>
      <div
        id="mock-login-btn"
        style={{
          width: "340px",
          padding: "12px 20px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          borderRadius: "24px",
          backgroundColor: "#f6f6f6",
          border: "0.5px solid #e0e0e0",
          fontSize: "14px",
          outline: "none",
          gap: "8px",
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out",
        }}
        onClick={onLogin}
      >
        <img
          src={chrome.runtime.getURL("public/google.png")}
          alt="google-icon"
          width={2000}
          height={2000}
          style={{ width: "20px", height: "20px" }}
        />
        <p
          style={{
            fontSize: 14,
            color: "#00000099",
            margin: 0,
          }}
        >
          Google бүртгэл ашиглах
        </p>
      </div>
      <p style={{ fontSize: "14px", color: "#00000099", margin: 0 }}>эсвэл</p>
      <input
        type="text"
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
          color: "white",
          width: "140px",
          marginTop: "16px",
          padding: "10px 16px",
          fontFamily: "monospace",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "-3px -3px 4px 0px #00000040 inset",
        }}
        onClick={shuudLogin}
      >
        Нэвтрэх
      </button>
      <p
        style={{
          fontSize: 16,
          cursor: "pointer",
          marginTop: 8,
          textDecoration: "underline",
          color: "#00000099",
        }}
        onClick={pageswitch}
      >
        Бүртгүүлэх
      </p>
      <p
        style={{
          fontSize: "11px",
          color: "#666666ff",
          fontWeight: "bold",
          marginTop: "50px",
          whiteSpace: "pre-line",
          textAlign: "center",
        }}
      >
        Powered by FlowFix {"\n"}Copyright © 2025 FlowFix. All rights reserved.
      </p>
    </div>
  );
}
