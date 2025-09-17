import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StepBubble } from "../Intro/StepBubble";
declare const chrome: any;
const avatars = [
  "public/avatars/avatar1.png",
  "public/avatars/avatar2.png",
  "public/avatars/avatar3.png",
  "public/avatars/avatar4.png",
  "public/avatars/avatar5.png",
  "public/avatars/avatar6.png",
];

export function AvatarSelect({
  onNext,
}: {
  onNext: (avatar: string, name: string) => void;
}) {
  const [name, setName] = useState("");
  const [current, setCurrent] = useState(0);
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

  const handleSubmit = () => {
    if (name.trim()) {
      onNext(avatars[current], name);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 20,
        fontFamily: "Arial, sans-serif",
        animation: "fadeIn 0.4s ease",
      }}
    >
      {/* Bubble */}
      <StepBubble
        text="Намайг нэрлээд хүссэн дүрээ сонгоорой"
        bottom="-10px"
        left="20%"
        rotate=""
      />

      {/* Avatar carousel */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <button
          onClick={handlePrev}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
        >
          <ChevronLeft size={32} />
        </button>

        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s ease, opacity 0.3s ease",
            transform: animating ? "scale(0.8)" : "scale(1)",
            opacity: animating ? 0.5 : 1,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          <img
            src={chrome.runtime.getURL(avatars[current])}
            alt="avatar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
          />
        </div>

        <button
          onClick={handleNext}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Input */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="жишээ: Buddy"
        style={{
          width: "340px",
          padding: "12px 20px",
          borderRadius: "24px",
          backgroundColor: "#f6f6f6",
          border: "0.5px solid #e0e0e0",
          fontSize: "14px",
          outline: "none",
          textAlign: "center",
          fontFamily: "monospace",
          transition: "box-shadow 0.2s ease",
        }}
      />

      {/* Continue button */}
      <button
        onClick={handleSubmit}
        disabled={!name.trim()}
        style={{
          backgroundColor: name.trim() ? "#0BA42C" : "#ccc",
          border: "none",
          borderRadius: "24px",
          color: "white",
          padding: "10px 16px",
          fontFamily: "monospace",
          fontSize: "16px",
          cursor: name.trim() ? "pointer" : "not-allowed",
          boxShadow: "-3px -3px 4px 0px #00000040 inset",
          transition: "background-color 0.3s ease, transform 0.2s",
          transform: name.trim() ? "scale(1)" : "scale(0.95)",
        }}
      >
        Үргэлжлүүлэхhello
      </button>
    </div>
  );
}
