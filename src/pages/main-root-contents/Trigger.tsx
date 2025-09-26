import { Search } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../../provider/userProvider";

declare const chrome: any;

interface TriggerProps {
  onClick?: () => void;
  show?: boolean;
  notification?: any | null;
}

export function Trigger({ onClick, show = true, notification }: TriggerProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [query, setQuery] = useState("");

  const { user, isLoading } = useUser();

  // Load saved position from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("trigger-pos");
    if (saved) {
      setPosition(JSON.parse(saved));
    } else {
      setPosition({
        x: window.innerWidth - 400,
        y: window.innerHeight - 250,
      });
    }
  }, []);

  // Save position
  useEffect(() => {
    if (position.x !== 0 && position.y !== 0) {
      localStorage.setItem("trigger-pos", JSON.stringify(position));
    }
  }, [position]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  return (
    <div
      ref={boxRef}
      className="trigger-dict"
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        width: 310,
        height: 160,
        borderRadius: "24px",
        border: "1px solid #FFFFFF66",
        padding: "16px",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 2147483647,
        animation: show
          ? "triggerIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
          : "triggerOut 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        transformOrigin: "bottom right",
      }}
    >
      {/* 🟦 Drag handle (жижиг саарал background) */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          width: "60px",
          height: "25px",
          background: "#f6f6f6",
          borderRadius: "50px",
          cursor: isDragging ? "grabbing" : "grab",
          marginBottom: "8px",
        }}
        onMouseDown={(e) => {
          if (!boxRef.current) return;
          const rect = boxRef.current.getBoundingClientRect();
          setIsDragging(true);
          setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
      />

      {/* 🟦 Content хэсэг → click болгож ашиглана */}
      <div
        style={{ flex: 1, width: "100%", textAlign: "center" }}
        onClick={() => {
          if (!isDragging && onClick) onClick();
        }}
      >
        {notification && (
          <div
            style={{
              position: "absolute",
              top: "-40px",
              left: "50px",
              width: "200px",
            }}
          >
            <p
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                color: "black",
                fontSize: "14px",
                margin: 0,
                zIndex: 200,
              }}
            >
              {notification
                ? `⏰ ${notification.title} @ ${new Date(
                    notification.datetime
                  ).toLocaleTimeString()}`
                : "Norif here saw"}
            </p>
            <img
              src={chrome.runtime.getURL("public/Union.png")}
              alt="Open Popover"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "200px",
                height: "auto",
                objectFit: "cover",
                zIndex: 100,
              }}
            />
          </div>
        )}
        <img
          src={chrome.runtime.getURL(`${user?.buddyUrl}`)}
          alt="Open Popover"
          style={{
            width: "60px",
            height: "100px",
            objectFit: "contain",
            marginBottom: "8px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            width: "90%",
            height: "30px",
            borderRadius: "40px",
            position: "relative",
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            overflow: "hidden",
          }}
        >
          <Search
            style={{
              position: "absolute",
              left: 20,
              top: "50%",
              transform: "translateY(-50%)",
            }}
            color="black"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Асуух зүйл байна уу?"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              paddingLeft: "40px",
              fontSize: "14px",
              color: "#000000cc",
              background: "transparent",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes triggerIn {
          0%   { opacity: 0; transform: scale(0.6) translateY(40px); filter: blur(6px); }
          25%  { opacity: 0.5; transform: scale(0.8) translateY(20px); filter: blur(3px); }
          50%  { opacity: 0.9; transform: scale(1.05) translateY(-4px); filter: blur(0); }
          75%  { opacity: 1; transform: scale(0.98) translateY(2px); filter: blur(0); }
          100% { opacity: 1; transform: scale(1.0) translateY(0); filter: blur(0); }
        }

        @keyframes triggerOut {
          0%   { opacity: 1; transform: scale(1.0) translateY(0); filter: blur(0); }
          25%  { opacity: 0.8; transform: scale(0.95) translateY(10px); filter: blur(2px); }
          50%  { opacity: 0.6; transform: scale(0.85) translateY(20px); filter: blur(4px); }
          75%  { opacity: 0.3; transform: scale(0.75) translateY(30px); filter: blur(6px); }
          100% { opacity: 0; transform: scale(0.6) translateY(40px); filter: blur(8px); }
        }
      `}</style>
    </div>
  );
}
