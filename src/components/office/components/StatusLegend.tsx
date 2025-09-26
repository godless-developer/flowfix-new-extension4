"use client";
import { useUser } from "@/provider/userProvider";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

const statusOptions = [
  { key: "active", label: "Оффис дээр байна", emoji: "👨‍💼" },
  { key: "remote", label: "Зайнаас ажиллаж байна", emoji: "🏠" },
];

export function StatusDropdown() {
  const { updateUser, user } = useUser();
  const [open, setOpen] = useState(false);

  // 🔥 Локал state — default нь office
  const [selectedStatus, setSelectedStatus] = useState(
    user?.status || "active"
  );

  const selected =
    statusOptions.find((opt) => opt.key === selectedStatus) || statusOptions[0];

  const handleSelect = (key: string) => {
    setSelectedStatus(key); // локал update → UI дээр шууд харагдана
    updateUser({ status: key }); // backend рүү update явуулна
    setOpen(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        width: "281px",
        fontSize: "15px",
        zIndex: 1000,
      }}
    >
      {/* Сонгогдсон item */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "white",
          borderRadius: "50px",
          padding: "6px 16px",
          color: "black",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          position: "relative",
        }}
      >
        <span>
          {selected.emoji} {selected.label}
        </span>
        <span
          style={{
            color: "black",
            position: "relative",
            width: "20px",
            height: "20px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: open ? 1 : 0,
              transition: "opacity 0.25s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronUp size={18} />
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: open ? 0 : 1,
              transition: "opacity 0.25s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronDown size={18} />
          </div>
        </span>
      </div>

      {/* Dropdown list */}
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "110%",
            left: 0,
            right: 0,
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            padding: "8px 0",
            color: "black",
            marginBottom: "8px",
            animation: "fadeIn 0.25s ease forwards",
          }}
        >
          {statusOptions.map((opt) => (
            <div
              key={opt.key}
              onClick={() => handleSelect(opt.key)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                cursor: "pointer",
                background:
                  selectedStatus === opt.key ? "#f6f6f6" : "transparent",
              }}
            >
              <span>
                {opt.emoji} {opt.label}
              </span>
              {selectedStatus === opt.key && (
                <span
                  style={{
                    width: "14px",
                    boxShadow: "-3px -3px 4px 0px #00000040 inset",
                    height: "14px",
                    backgroundColor: "#0BA42C",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* fade animation keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
