"use client";
import React, { useState, useEffect } from "react";
import { AvatarSelect } from "./AvatarSelect";
import { EndAndBegin } from "./EndAndBegin";
import { useUser } from "@/provider/userProvider";
declare const chrome: any;
export function InitSelect({ onFinish }: { onFinish: () => void }) {
  const [page, setPage] = useState<"avatar" | "end" | "loading">("avatar");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [animationState, setAnimationState] = useState<"enter" | "exit">(
    "enter"
  );

  const { updateUser } = useUser();

  useEffect(() => {
    setAnimationState("enter");
  }, [page]);

  const handleNext = async (avatar: string, name: string) => {
    setSelectedAvatar(avatar);
    setUserName(name);
    setPage("loading");

    try {
      const success = await updateUser({
        buddyUrl: avatar,
        buddyName: name,
      });

      if (!success) {
        console.error("Failed to update buddy info");
        setPage("avatar"); // update алдавал буцаана
        return;
      }

      // Update OK → end рүү шилжинэ
      setPage("end");
    } catch (e) {
      console.error("Error updating user", e);
      setPage("avatar");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        animation:
          animationState === "enter"
            ? "fadeSlideIn 0.5s ease forwards"
            : "fadeSlideOut 0.5s ease forwards",
      }}
    >
      {page === "avatar" && <AvatarSelect onNext={handleNext} />}

      {page === "loading" && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: 20,
            color: "#fff",
          }}
        >
          <div
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              src={chrome.runtime.getURL(selectedAvatar)}
              alt={userName}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          <p style={{ fontSize: "16px", fontWeight: "bold", color: "black" }}>
            Бүртгэл үүсэж байна...
          </p>

          {/* typing dots animation */}
          <div
            style={{
              color: "#fff",
              padding: "12px 14px",
              borderRadius: "16px",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#6a6a6aff",
                  display: "inline-block",
                  animation: "typing-bounce 1.2s infinite",
                  animationDelay: "0s",
                }}
              ></span>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#6a6a6aff",
                  display: "inline-block",
                  animation: "typing-bounce 1.2s infinite",
                  animationDelay: "0.2s",
                }}
              ></span>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#6a6a6aff",
                  display: "inline-block",
                  animation: "typing-bounce 1.2s infinite",
                  animationDelay: "0.4s",
                }}
              ></span>
            </span>
          </div>

          <style>
            {`
              @keyframes typing-bounce {
                0%, 80%, 100% {
                  transform: translateY(0);
                  background: #6a6a6aff;
                  opacity: 1;
                }
                40% {
                  transform: translateY(-8px);
                  background: #455072;
                  opacity: 1;
                }
              }
            `}
          </style>
        </div>
      )}

      {page === "end" && (
        <EndAndBegin
          avatar={selectedAvatar}
          name={userName}
          onFinish={onFinish}
        />
      )}
    </div>
  );
}
