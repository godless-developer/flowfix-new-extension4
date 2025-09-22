"use client";
import { useUser } from "@/provider/userProvider";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

const statusOptions = [
  { key: "active", label: "Оффис дээр байна", emoji: "👨‍💼" },
  { key: "remote", label: "Зайнаас ажиллаж байна", emoji: "🏠" },
  { key: "onvacation", label: "Чөлөө авсан", emoji: "🏃" },
  { key: "sick", label: "Өвчтэй", emoji: "🤒" },
];

export function StatusDropdown() {
  const { updateUser, user } = useUser();
  const [open, setOpen] = useState(false);

  const selected =
    statusOptions.find((opt) => opt.key === user?.status) || statusOptions[0];

  const handleSelect = (key: string) => {
    updateUser({ status: key });
    setOpen(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        width: "241px",
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
          borderRadius: "12px",
          padding: "10px 16px",
          color: "black",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <span>
          {selected.emoji} {selected.label}
        </span>
        <span
          style={{
            color: "black",
          }}
        >
          {open ? <ChevronDown /> : <ChevronUp />}
        </span>
      </div>

      {/* Dropdown list (dropup = дээш нээгдэнэ) */}
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
                  user?.status === opt.key
                    ? "rgba(97, 138, 255, 0.1)"
                    : "transparent",
              }}
            >
              <span>
                {opt.emoji} {opt.label}
              </span>
              {user?.status === opt.key && (
                <span
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: "linear-gradient(to right, #45c7fa, #c53de7)",
                    display: "inline-block",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
