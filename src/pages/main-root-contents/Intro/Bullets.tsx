import React from "react";

export const Bullets = ({ bullets }: { bullets: any[] }) => (
  <div style={{ textAlign: "left", maxWidth: "600px", marginBottom: "44px" }}>
    {bullets.map((item, idx) => (
      <div
        key={idx}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            ...item.style,
            borderRadius: "8px",
            color: "white",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "20px",
          }}
        >
          {item.number}
        </div>
        <div style={{ marginBottom: "16px"}}>
          <strong
            style={{
              fontSize: "16px",
              fontWeight: 510,
              color: "#000000",
            }}
          >
            {item.title}
          </strong>
          <p
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: 400,
              color: "#000000",
              opacity: "60%",
            }}
          >
            {item.subtitle}
          </p>
        </div>
      </div>
    ))}
  </div>
);
