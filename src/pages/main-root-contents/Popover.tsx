import React from "react";
import { X } from "lucide-react";

export function Popover({
  children,
  x,
  width = 390,
  height = 500,
}: {
  children: React.ReactNode;
  width?: number;
  height?: number;
  x?: any;
}) {
  return (
    <div
      className="popover"
      style={{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: 20,
        borderRadius: 24,
        boxShadow: "-24px -24px 32px 0px #00000040 inset",
        zIndex: 2147483647,
        width,
        height,
        maxWidth: "90vw",
        fontFamily: "SF Pro",
      }}
    >
      {x}
      {children}
    </div>
  );
}
