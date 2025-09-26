// OfficeView.tsx
"use client";
import { Crown, Mail, User } from "lucide-react";
import React, { useState } from "react";

declare const chrome: any;

type Coordinate = {
  id: string;
  x: number;
  y: number;
  type: "front" | "back" | "left" | "right" | "spec" | "spec1";
};

type Props = {
  coordinates: Coordinate[];
  occupied: { [key: string]: { img: string; status?: string } };
  selectedChair: string | null;
  onChairClick: (chairId: string) => void;
  onSit: (chairId: string) => void;
  getUserInfo: (
    id: string
  ) => { name: string; email: string; department?: string } | undefined;
};

export function OfficeView({
  coordinates,
  occupied,
  selectedChair,
  onChairClick,
  onSit,
  getUserInfo,
}: Props) {
  const [hoveredUserId, setHoveredUserId] = useState<string | null>(null);

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

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <img
        src={chrome.runtime.getURL("public/officeSetup.png")}
        alt="Office Background"
        style={{
          width: "200px",
          objectFit: "contain",
          position: "absolute",
          top: -50,
          left: -90,
        }}
      />
      <img
        src={chrome.runtime.getURL("public/officeSetup.png")}
        alt="Office Background"
        style={{
          width: "200px",
          objectFit: "contain",
          position: "absolute",
          top: 70,
          left: -90,
        }}
      />
      <img
        src={chrome.runtime.getURL("public/officeSetup.png")}
        alt="Office Background"
        style={{
          width: "200px",
          objectFit: "contain",
          position: "absolute",
          top: -50,
          left: 200,
        }}
      />
      <img
        src={chrome.runtime.getURL("public/officeSetup.png")}
        alt="Office Background"
        style={{
          width: "200px",
          objectFit: "contain",
          position: "absolute",
          top: 70,
          left: 200,
        }}
      />

      {coordinates.map((coord) => {
        let chairImg = "";
        let rotation = "0deg";

        if (coord.type === "front")
          chairImg = chrome.runtime.getURL("public/chairFront.png");
        else if (coord.type === "back")
          chairImg = chrome.runtime.getURL("public/chairBack.png");
        else if (coord.type === "left") {
          chairImg = chrome.runtime.getURL("public/chairFront.png");
          rotation = "90deg";
        } else if (coord.type === "spec") {
          chairImg = chrome.runtime.getURL("public/chairFront.png");
          rotation = "120deg";
        } else if (coord.type === "spec1") {
          chairImg = chrome.runtime.getURL("public/chairFront.png");
          rotation = "105deg";
        } else if (coord.type === "right") {
          chairImg = chrome.runtime.getURL("public/chairFront.png");
          rotation = "-90deg";
        }

        const userData = occupied[coord.id];
        const userInfo = userData ? getUserInfo(coord.id) : null;

        return (
          <div
            key={coord.id}
            style={{
              position: "absolute",
              left: coord.x,
              top: coord.y,
              transform: "translate(-50%, -50%)",
              zIndex: 5,
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={chairImg}
                alt={`${coord.type} Chair`}
                style={{
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  transform: `rotate(${rotation})`,
                }}
                onClick={() => onChairClick(coord.id)}
              />

              {userData && (
                <div
                  style={{
                    position: "absolute",
                    top: "-5px",
                    left: "50%",
                    width: "20px",
                    height: "20px",
                    transform: "translateX(-50%)",
                  }}
                  onMouseEnter={() => setHoveredUserId(coord.id)}
                  onMouseLeave={() => setHoveredUserId(null)}
                >
                  <img
                    src={userData.img}
                    alt="Person"
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      boxShadow: "0 0 4px rgba(0,0,0,0.3)",
                    }}
                  />
                  {/* status dot */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-2px",
                      right: "-2px",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: getStatusColor(userData.status),
                      border: "1px solid white",
                    }}
                  />
                </div>
              )}

              {hoveredUserId === coord.id && userInfo && (
                <div
                  style={{
                    position: "absolute",
                    top: "-65px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(0,0,0,0.7)",
                    color: "white",
                    padding: "4px 6px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    whiteSpace: "nowrap",
                    zIndex: 200000,
                  }}
                >
                  <div
                    style={{
                      display: "flex ",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <User size={12} />
                    {userInfo.name}
                  </div>
                  <div
                    style={{
                      display: "flex ",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <Mail size={12} />
                    {userInfo.email}
                  </div>
                  <div
                    style={{
                      display: "flex ",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <Crown size={12} />
                    {userInfo.department}
                  </div>
                </div>
              )}

              {selectedChair === coord.id && (
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    padding: "5px 8px",
                    zIndex: 10,
                  }}
                >
                  <button
                    style={{
                      background: "#404040eb",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "3px 8px",
                      cursor: "pointer",
                      fontSize: "8px",
                    }}
                    onClick={() => onSit(coord.id)}
                  >
                    Сууx
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
