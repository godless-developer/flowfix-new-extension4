"use client";
import { useUser } from "@/provider/userProvider";
import React from "react";

const getStatusColor = (status?: string) => {
  switch (status) {
    case "active":
      return "green";
    case "inactive":
      return "gray";
    case "remote":
      return "blue";
    case "onvacation":
      return "orange";
    default:
      return "transparent";
  }
};

const statusLabels: Record<string, string> = {
  active: "Active",
  inactive: "Inactive",
  remote: "Remote",
  onvacation: "On Vacation",
};

export function StatusLegend() {
  const { updateUser, user, _id, refetch } = useUser();
  return (
    <div
      style={{
        position: "absolute",
        top: "22px",
        right: "-47px",
        transform: "translateX(-50%)",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        background: "rgba(0,0,0,0.7)",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {Object.entries(statusLabels).map(([key, label]) => {
        const color = getStatusColor(key);
        return (
          <div
            key={key}
            onClick={() =>
              updateUser(_id, {
                status: key,
              })
            }
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textWrap: "nowrap",
              cursor: "pointer",
            }}
            aria-disabled={user?.status == key}
          >
            <span
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background:
                  user?.status == key
                    ? "linear-gradient(to right, #45c7faff, #c53de7ff)"
                    : "", // outer gradient
                padding: "2px", // border-ийн зузаан
                boxSizing: "border-box",
                backgroundClip: "padding-box",
              }}
            >
              <span
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: color, // дотор талын өнгө
                  display: "block",
                }}
              />
            </span>
            <span style={{ fontSize: "14px", color: "white" }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
