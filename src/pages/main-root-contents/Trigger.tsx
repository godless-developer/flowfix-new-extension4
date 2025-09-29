import { Search } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../../provider/userProvider";
import axios from "axios";

declare const chrome: any;

interface TriggerProps {
  onClick?: () => void;
  show?: boolean;
}

export function Trigger({ onClick, show = true }: TriggerProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [query, setQuery] = useState("");
  const [latestNotif, setLatestNotif] = useState<string>(""); // ⬅️ одоо харуулах title
  const [prevNotif, setPrevNotif] = useState<string>(""); // ⬅️ өмнөх title хадгалах
  const [showNotif, setShowNotif] = useState(false);

  const { user } = useUser();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  // 🟢 Fetch latest notification
  const fetchLatestNotif = async () => {
    try {
      const res = await api.get("/notif/latest");
      if (res.status === 200 && res.data?.title) {
        const newTitle = res.data.title;

        // өмнөхтэй адилхан бол харуулахгүй
        if (newTitle !== prevNotif) {
          setLatestNotif(newTitle);
          setPrevNotif(newTitle);
          setShowNotif(true);

          // 5s дараа автоматаар алга болгоно
          setTimeout(() => {
            setShowNotif(false);
          }, 5000);
        }
      }
    } catch (e) {
      console.error("Fetch latest notif failed:", e);
    }
  };

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

  // Drag events
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

  // 🟢 5s тутам notif fetch
  useEffect(() => {
    fetchLatestNotif(); // эхний удаа
    const interval = setInterval(fetchLatestNotif, 5000);
    return () => clearInterval(interval);
  }, [prevNotif]); // prevNotif-д хамааралтай

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
      {/* 🟦 Drag handle */}
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

      {/* 🟦 Content */}
      <div
        style={{ flex: 1, width: "100%", textAlign: "center" }}
        onClick={() => {
          if (!isDragging && onClick) onClick();
        }}
      >
        {/* 🟢 Notification Title */}
        {showNotif && latestNotif && (
          <div
            style={{
              position: "absolute",
              top: "-40px",
              left: "50px",
              width: "200px",
              transition: "opacity 0.5s ease",
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
              ⏰ {latestNotif}
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

        {/* 🟦 Buddy Image */}
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

        {/* 🟦 Input */}
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
    </div>
  );
}
