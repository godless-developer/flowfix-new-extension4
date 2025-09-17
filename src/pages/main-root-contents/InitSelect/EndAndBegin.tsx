import React from "react";
import { StepBubble } from "../Intro/StepBubble";

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
        height: "100%",
        gap: 20,
        fontFamily: "Arial, sans-serif",
        animation: "fadeIn 0.4s ease",
      }}
    >
      {/* Bubble */}
      <StepBubble
        text="Би танд үргэлж туслах болно"
        bottom="-10px"
        left="25%"
        rotate=""
      />

      {/* Chosen avatar */}
      <div
        style={{
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
          transition: "transform 0.3s ease",
        }}
      >
        <img
          src={avatar}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <p
        style={{
          fontSize: "16px",
          fontFamily: "monospace",
          margin: 0,
        }}
      >
        {name}
      </p>

      {/* Start button */}
      <button
        onClick={onFinish}
        style={{
          backgroundColor: "#0BA42C",
          border: "none",
          borderRadius: "24px",
          color: "white",
          padding: "10px 16px",
          fontFamily: "monospace",
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
