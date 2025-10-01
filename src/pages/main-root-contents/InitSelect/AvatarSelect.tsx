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
        animation: "fadeIn 0.4s ease",
      }}
    >
      {/* Bubble */}
      <StepBubble
        text={
          <>
            Намайг нэрлээд хүссэн дүрээ
            <br /> сонгоорой
          </>
        }
        bottom="100px"
        left="330px"
        textLeft="350px"
        union=""
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
          }}
        >
          <img
            src={chrome.runtime.getURL(avatars[current])}
            alt="avatar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
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

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Жишээ: Buddy"
        style={{
          width: "340px",
          padding: "12px 20px",
          borderRadius: "24px",
          backgroundColor: "#f6f6f6",
          border: "0.5px solid #e0e0e0",
          fontSize: "14px",
          outline: "none",
          textAlign: "center",
          transition: "box-shadow 0.2s ease",
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={!name.trim()}
        style={{
          backgroundColor: name.trim() ? "#0BA42C" : "#ccc",
          border: "none",
          borderRadius: "24px",
          color: "white",
          padding: "10px 16px",
          fontSize: "16px",
          cursor: name.trim() ? "pointer" : "pointer",
          boxShadow: "-3px -3px 4px 0px #00000040 inset",
          transition: "background-color 0.3s ease, transform 0.2s",
          transform: name.trim() ? "scale(1)" : "scale(0.95)",
        }}
      >
        Үргэлжлүүлэх
      </button>
    </div>
  );
}
