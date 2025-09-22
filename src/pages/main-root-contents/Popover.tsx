import React from "react";
import { X } from "lucide-react";

export function Popover({
  children,
  x,
  width = 390,
  height = 500,
  show = true,
}: {
  children: React.ReactNode;
  width?: number;
  height?: number;
  x?: any;
  show?: boolean;
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
        background: "white",
        padding: 20,
        borderRadius: 24,
        boxShadow:
          "0px 20px 40px rgba(0,0,0,0.25), -16px -16px 24px rgba(255,255,255,0.6) inset",
        zIndex: 2147483647,
        width,
        height,
        maxWidth: "90vw",
        animation: show
          ? "popoverIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
          : "popoverOut 0.55s cubic-bezier(0.34, 1, 0.68, 1) forwards",
        transformOrigin: "bottom right",
      }}
    >
      {x}
      {children}

      <style>{`
        @keyframes popoverIn {
          0%   { opacity: 0;   transform: translate(-50%, -50%) scale(0.70) translateY(60px); filter: blur(12px); }
          5%   { opacity: 0.15; transform: translate(-50%, -50%) scale(0.74) translateY(52px); filter: blur(10px); }
          10%  { opacity: 0.3;  transform: translate(-50%, -50%) scale(0.78) translateY(44px); filter: blur(8px); }
          15%  { opacity: 0.45; transform: translate(-50%, -50%) scale(0.82) translateY(36px); filter: blur(6px); }
          20%  { opacity: 0.6;  transform: translate(-50%, -50%) scale(0.86) translateY(28px); filter: blur(5px); }
          25%  { opacity: 0.7;  transform: translate(-50%, -50%) scale(0.90) translateY(22px); filter: blur(4px); }
          30%  { opacity: 0.8;  transform: translate(-50%, -50%) scale(0.94) translateY(16px); filter: blur(3px); }
          35%  { opacity: 0.85; transform: translate(-50%, -50%) scale(0.97) translateY(10px); filter: blur(2px); }
          40%  { opacity: 0.9;  transform: translate(-50%, -50%) scale(1.02) translateY(4px);  filter: blur(1px); }
          45%  { opacity: 0.95; transform: translate(-50%, -50%) scale(1.04) translateY(-2px); filter: blur(0); }
          50%  { opacity: 1;    transform: translate(-50%, -50%) scale(1.03) translateY(-4px); filter: blur(0); }
          55%  { opacity: 1;    transform: translate(-50%, -50%) scale(1.02) translateY(-3px); filter: blur(0); }
          60%  { opacity: 1;    transform: translate(-50%, -50%) scale(1.00) translateY(-1px); filter: blur(0); }
          65%  { opacity: 1;    transform: translate(-50%, -50%) scale(0.99) translateY(1px);  filter: blur(0); }
          70%  { opacity: 1;    transform: translate(-50%, -50%) scale(1.01) translateY(-1px); filter: blur(0); }
          75%  { opacity: 1;    transform: translate(-50%, -50%) scale(1.00) translateY(0px);  filter: blur(0); }
          80%  { opacity: 1;    transform: translate(-50%, -50%) scale(1.00) translateY(0px);  filter: blur(0); }
          85%  { opacity: 1;    transform: translate(-50%, -50%) scale(1.00) translateY(0px);  filter: blur(0); }
          90%  { opacity: 1;    transform: translate(-50%, -50%) scale(1.00) translateY(0px);  filter: blur(0); }
          95%  { opacity: 1;    transform: translate(-50%, -50%) scale(1.00) translateY(0px);  filter: blur(0); }
          100% { opacity: 1;    transform: translate(-50%, -50%) scale(1.00) translateY(0px);  filter: blur(0); }
        }

        @keyframes popoverOut {
          0%   { opacity: 1; transform: translate(-50%, -50%) scale(1.00) translateY(0px);  filter: blur(0); }
          5%   { opacity: 1; transform: translate(-50%, -50%) scale(1.02) translateY(-3px); filter: blur(0); }
          10%  { opacity: 1; transform: translate(-50%, -50%) scale(1.01) translateY(-2px); filter: blur(0); }
          15%  { opacity: 1; transform: translate(-50%, -50%) scale(0.99) translateY(0px);  filter: blur(0); }
          20%  { opacity: 1; transform: translate(-50%, -50%) scale(0.97) translateY(4px);  filter: blur(0); }
          25%  { opacity: 1; transform: translate(-50%, -50%) scale(0.95) translateY(8px);  filter: blur(0); }
          30%  { opacity: 1; transform: translate(-50%, -50%) scale(0.94) translateY(12px); filter: blur(0); }
          35%  { opacity: 1; transform: translate(-50%, -50%) scale(0.93) translateY(16px); filter: blur(0); }
          40%  { opacity: 1; transform: translate(-50%, -50%) scale(0.92) translateY(20px); filter: blur(0); }
          45%  { opacity: 0.95; transform: translate(-50%, -50%) scale(0.91) translateY(24px); filter: blur(1px); }
          50%  { opacity: 0.9; transform: translate(-50%, -50%) scale(0.90) translateY(28px); filter: blur(2px); }
          55%  { opacity: 0.8; transform: translate(-50%, -50%) scale(0.88) translateY(32px); filter: blur(3px); }
          60%  { opacity: 0.7; transform: translate(-50%, -50%) scale(0.86) translateY(36px); filter: blur(4px); }
          65%  { opacity: 0.6; transform: translate(-50%, -50%) scale(0.84) translateY(40px); filter: blur(6px); }
          70%  { opacity: 0.45; transform: translate(-50%, -50%) scale(0.82) translateY(44px); filter: blur(8px); }
          75%  { opacity: 0.3; transform: translate(-50%, -50%) scale(0.80) translateY(48px); filter: blur(10px); }
          80%  { opacity: 0.2; transform: translate(-50%, -50%) scale(0.78) translateY(52px); filter: blur(12px); }
          85%  { opacity: 0.15; transform: translate(-50%, -50%) scale(0.76) translateY(56px); filter: blur(12px); }
          90%  { opacity: 0.1; transform: translate(-50%, -50%) scale(0.74) translateY(60px); filter: blur(12px); }
          95%  { opacity: 0.05; transform: translate(-50%, -50%) scale(0.72) translateY(64px); filter: blur(12px); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.70) translateY(68px); filter: blur(12px); }
        }
      `}</style>
    </div>
  );
}
