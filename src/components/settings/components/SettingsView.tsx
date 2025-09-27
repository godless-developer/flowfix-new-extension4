"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Switch } from "./Switch";
declare const chrome: any;

const avatars = [
  "public/avatars/avatar1.png",
  "public/avatars/avatar2.png",
  "public/avatars/avatar3.png",
  "public/avatars/avatar4.png",
  "public/avatars/avatar5.png",
  "public/avatars/avatar6.png",
];

export function SettingsView({ user }: { user: any }) {
  const [current, setCurrent] = useState(
    Math.max(0, avatars.indexOf(user?.buddyUrl) || 0)
  );
  const [buddyName, setBuddyName] = useState(user?.buddyName || "Buddy");

  const [notifTasks, setNotifTasks] = useState(true);
  const [notifReminder, setNotifReminder] = useState(true);
  const [notifTime, setNotifTime] = useState("10 мин өмнө");

  const [animating, setAnimating] = useState(false);

  const handlePrev = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + avatars.length) % avatars.length);
      setAnimating(false);
    }, 200);
  };

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % avatars.length);
      setAnimating(false);
    }, 200);
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        overflow: "auto",
      }}
    >
      {/* Avatar carousel with animation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          marginTop: 30,
        }}
      >
        <button
          onClick={handlePrev}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>

        <div
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s ease, opacity 0.3s ease",
            transform: animating ? "scale(0.8)" : "scale(1)",
            opacity: animating ? 0.5 : 1,
          }}
        >
          <img
            src={chrome.runtime.getURL(avatars[current])}
            alt="avatar"
            style={{
              width: "90%",
              height: "90%",
              objectFit: "contain",
              transition: "transform 0.3s ease",
            }}
          />
        </div>

        <button
          onClick={handleNext}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <ChevronRight size={24} strokeWidth={2} />
        </button>
      </div>

      <div
        style={{
          marginTop: 16,
          padding: "8px 20px",
          background: "#f9f9f9",
          border: "1px solid #e0e0e0",
          borderRadius: "24px",
          color: "black",
          width: "190px",
          fontSize: "16px",
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        {buddyName}
      </div>

      {/* --- Notifications --- */}
      <div
        style={{
          marginTop: 40,
          width: "100%",
          maxWidth: "90%",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          color: "black",
        }}
      >
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 400,
            color: "#7f7f7f",
            margin: 0,
          }}
        >
          Мэдэгдлийн тохиргоо
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 20px",
              background: "#f6f6f6",
              borderRadius: "999px",
              border: "0.5px solid #e0e0e0",
            }}
          >
            <span style={{ fontSize: "16px", color: "black", opacity: 80 }}>
              Хийх зүйлийн мэдэгдэл
            </span>
            <Switch />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 20px",
              border: "0.5px solid #e0e0e0",
              background: "#f6f6f6",
              borderRadius: "999px",
            }}
          >
            <span style={{ fontSize: "16px", color: "black", opacity: 80 }}>
              Сануулах
            </span>
            <Switch />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "6px 6px 6px 20px",
              border: "0.5px solid #e0e0e0",
              background: "#f6f6f6",
              borderRadius: "999px",
            }}
          >
            <span style={{ fontSize: "16px", color: "black", opacity: 80 }}>
              Мэдэгдэл ирэх цаг
            </span>
            <div
              style={{
                padding: "4px 8px",
                border: "1px solid #e0e0e0",
                background: "white",
                borderRadius: "24px",
              }}
            >
              <select
                value={notifTime}
                onChange={(e) => setNotifTime(e.target.value)}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: "14px",
                  padding: "8px 4px",
                }}
              >
                <option>5 мин өмнө</option>
                <option>10 мин өмнө</option>
                <option>15 мин өмнө</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
