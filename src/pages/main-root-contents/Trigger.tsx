import React, { useRef, useEffect } from "react";

declare const chrome: any;

interface TriggerProps {
  onClick: () => void;
}

export function Trigger({ onClick }: TriggerProps) {
  return (
    <div
      className="trigger-dict"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 90,
        height: 90,
        cursor: "pointer",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2147483647,
      }}
      onClick={onClick}
    >
      <img
        src={chrome.runtime.getURL("public/blob.png")}
        alt="Open Popover"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
