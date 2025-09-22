import React from "react";

interface ControlsProps {
  onNext: () => void;
  onSkip: () => void;
}

export const Controls = ({ onNext, onSkip }: ControlsProps) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      padding: "0px 10px",
    }}
  >
    <button
      onClick={onSkip}
      style={{
        background: "none",
        border: "none",
        color: "#000000",
        opacity: "60%",
        textDecoration: "underline",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      Алгасах
    </button>
    <button
      onClick={onNext}
      style={{
        backgroundColor: "#0BA42C",
        border: "none",
        borderRadius: "24px",
        color: "white",
        padding: "10px 16px",
        fontSize: "16px",
        cursor: "pointer",
        boxShadow: "-3px -3px 4px 0px #00000040 inset",
      }}
    >
      Үргэлжлүүлэх
    </button>
  </div>
);
