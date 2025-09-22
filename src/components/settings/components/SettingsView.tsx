"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  const handlePrev = () =>
    setCurrent((prev) => (prev - 1 + avatars.length) % avatars.length);
  const handleNext = () => setCurrent((prev) => (prev + 1) % avatars.length);

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
          <ChevronLeft size={32} />
        </button>

        <img
          src={chrome.runtime.getURL(avatars[current])}
          alt="avatar"
          style={{
            width: "140px",
            height: "140px",
            objectFit: "contain",
          }}
        />

        <button
          onClick={handleNext}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <ChevronRight size={32} />
        </button>
      </div>

      <div
        style={{
          marginTop: 16,
          padding: "6px 20px",
          background: "#f9f9f9",
          border: "1px solid #e0e0e0",
          borderRadius: "24px",
          color: "black",
          fontSize: "15px",
          fontWeight: 500,
        }}
      >
        {buddyName}
      </div>

      <div
        style={{
          marginTop: 10,
          width: "100%",
          maxWidth: "90%",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          color: "black",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#333" }}>
          Мэдэгдлийн тохиргоо
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 20px",
            background: "#f6f6f6",
            borderRadius: "24px",
          }}
        >
          <span>Хийх зүйлийн мэдэгдэл</span>
          <input
            type="checkbox"
            checked={notifTasks}
            onChange={(e) => setNotifTasks(e.target.checked)}
            style={{ width: 20, height: 20 }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 20px",
            background: "#f6f6f6",
            borderRadius: "24px",
          }}
        >
          <span>Сануулах</span>
          <input
            type="checkbox"
            checked={notifReminder}
            onChange={(e) => setNotifReminder(e.target.checked)}
            style={{ width: 20, height: 20 }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 20px",
            background: "#f6f6f6",
            borderRadius: "24px",
          }}
        >
          <span>Мэдэгдэл ирэх цаг</span>
          <select
            value={notifTime}
            onChange={(e) => setNotifTime(e.target.value)}
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
              fontSize: "14px",
            }}
          >
            <option>5 мин өмнө</option>
            <option>10 мин өмнө</option>
            <option>15 мин өмнө</option>
          </select>
        </div>
      </div>
    </div>
  );
}
