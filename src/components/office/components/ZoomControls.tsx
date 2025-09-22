"use client";
import React from "react";
import { Plus, Minus, RotateCcwIcon } from "lucide-react";

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
    padding: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: "999px",
    background: "black",
    color: "#fff",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        textAlign: "center",
        position: "absolute",
        right: "10px",
        bottom: "40px",
        transform: "translateX(-50%)",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        ...style,
      }}
    >
      <button onClick={zoomIn} style={buttonStyle}>
        <Plus size={26} />
      </button>
      <button onClick={zoomOut} style={buttonStyle}>
        <Minus size={26} />
      </button>
      <button onClick={resetTransform} style={buttonStyle}>
        <RotateCcwIcon size={26} />
      </button>
    </div>
  );
}
