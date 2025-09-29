import React from "react";

declare const chrome: any;

export function Login({
  onLogin,
  userNameLogin,
  pageswitch,
}: {
  onLogin: () => void;
  userNameLogin: (username: string, password: string) => void;
  pageswitch: () => void;
}) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
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
          textAlign: "center",
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
            paddingTop: 3,
            color: "#00000099",
            margin: 0,
          }}
        >
          Google-ээр нэвтрэх
        </p>
      </div>
      <p style={{ fontSize: "14px", color: "#00000099", margin: 0 }}>эсвэл</p>
      <input
        type="text"
        placeholder="Нэр"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "-3px -3px 4px 0px #00000040 inset",
        }}
        onClick={() => userNameLogin(username, password)}
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
    </div>
  );
}
