import React from "react";
declare const chrome: any;
export function EndAndBegin({
  avatar,
  name,
  onFinish,
}: {
  avatar: string;
  name: string;
  onFinish: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        height: "100%",
        gap: 20,
        animation: "fadeIn 0.4s ease",
      }}
    >
      <div
        style={{
          position: "relative",
          border: "1px solid #ddd",
          borderRadius: "16px",
          padding: "16px 20px",
          justifyContent: "center",
          alignItems: "center",
          display: "inline-block",
          marginBottom: "16px",
          backgroundColor: "white",
          width: "294px",
          height: "55px",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "25%",
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderTop: "10px solid #ddd",
          }}
        />
        <div style={{ marginTop: "10px ", display: "flex" }}>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              margin: 0,
              paddingRight: "8px",
            }}
          >
            {name}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: 400,
              margin: 0,
              color: "#000000",
            }}
          >
            {`нь хэзээд танд туслахад бэлэн шүү!`}
          </p>
        </div>
      </div>

      <div
        style={{
          width: "140px",
          height: "140px",
          overflow: "hidden",
          transition: "transform 0.3s ease",
        }}
      >
        <img
          src={chrome.runtime.getURL(avatar)}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      <button
        onClick={onFinish}
        style={{
          backgroundColor: "#0BA42C",
          border: "none",
          borderRadius: "24px",
          color: "white",
          marginTop: "30px",
          padding: "10px 16px",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "-3px -3px 4px 0px #00000040 inset",
          transition: "transform 0.2s ease, background-color 0.3s ease",
        }}
      >
        Эхлэх
      </button>
    </div>
  );
}
