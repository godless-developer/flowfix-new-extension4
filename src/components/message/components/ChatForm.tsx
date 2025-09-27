import { Search, Send } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

export function ChatForm({ onSend }: { onSend: (message: string) => void }) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLInputElement>(null);

  const isActive = text.trim().length > 0;

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isActive) {
      onSend(text.trim());
      setText(""); // clear input after sending
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 150) + "px";
    }
  }, [text]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "80%",
          alignItems: "center",
          backgroundColor: "#F5F5F5",
          borderRadius: "999px",
          padding: "12px 45px 12px 50px",
        }}
      >
        {/* Search Icon */}
        <div
          style={{
            position: "absolute",
            left: 14,
            bottom: 13,
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
            color: "#aaa",
          }}
        >
          <Search size={24} strokeWidth={2.2} />
        </div>

        {/* Input */}
        <input
          ref={textareaRef}
          placeholder="Асуух зүйл байна уу?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            width: "90%",
            minHeight: "24px",
            maxHeight: "100px",
            backgroundColor: "transparent",
            color: "black",
            border: "none",
            outline: "none",
            fontSize: "15px",
            lineHeight: "20px",
          }}
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!isActive}
          style={{
            position: "absolute",
            right: -65,
            bottom: 1,
            background: isActive ? "#2600FFB2" : "#f5f5f5",
            width: "52px",
            height: "52px",
            borderRadius: "9999px",
            border: isActive ? "0.5px solid #2600FFB2" : "0.5px solid #e5e5e5",
            cursor: isActive ? "pointer" : "not-allowed",
            outline: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "all 0.2s ease",
          }}
        >
          <Send
            style={{
              width: "20px",
              height: "20px",
              color: isActive ? "white" : "#d1d5db",
            }}
          />
        </button>
      </div>
    </form>
  );
}
