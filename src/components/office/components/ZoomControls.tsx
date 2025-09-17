"use client";
import React from "react";
import { Plus, Minus, RotateCcwIcon } from "lucide-react";
import { StatusLegend } from "./StatusLegend";

type ZoomControlsProps = {
  zoomIn: () => void;
  zoomOut: () => void;
  resetTransform: () => void;
  style?: React.CSSProperties;
};

export function ZoomControls({
  zoomIn,
  zoomOut,
  resetTransform,
  style,
}: ZoomControlsProps) {
  const buttonStyle: React.CSSProperties = {
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: "999px",
    background: "linear-gradient(to right, #9747FF, #6091BD)",
    color: "#fff",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        textAlign: "center",
        position: "absolute",
        top: "22px",
        left: "80px",
        transform: "translateX(-50%)",
        zIndex: 10,
        display: "flex",
        gap: "10px",
        ...style,
      }}
    >
      <button onClick={zoomIn} style={buttonStyle}>
        <Plus size={20} />
      </button>
      <button onClick={zoomOut} style={buttonStyle}>
        <Minus size={20} />
      </button>
      <button onClick={resetTransform} style={buttonStyle}>
        <RotateCcwIcon size={20} />
      </button>
    </div>
  );
}
