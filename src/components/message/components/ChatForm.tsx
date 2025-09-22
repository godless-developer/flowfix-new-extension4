import { Search, Send } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

export function ChatForm({ onSend }: { onSend: (message: string) => void }) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (text.trim() !== "") {
      onSend(text.trim());
      setText("");
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "24px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 150) + "px";
    }
  }, [text]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
          alignItems: "center",
          backgroundColor: "#F5F5F5",
          borderRadius: "22px",
          padding: "12px 45px 12px 40px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 12,
            bottom: 22,
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
            color: "#aaa",
          }}
        >
          <Search size={18} strokeWidth={2.2} />
        </div>
        <textarea
          ref={textareaRef}
          placeholder="Асуух зүйл байна уу?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          style={{
            flex: 1,
            resize: "none",
            width: "100%",
            minHeight: "24px",
            maxHeight: "100px",
            backgroundColor: "transparent",
            color: "white",
            border: "none",
            outline: "none",
            fontSize: "14px",
            lineHeight: "20px",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        />

        <button
          type="submit"
          disabled={text.trim().length === 0}
          style={{
            position: "absolute",
            right: 10,
            bottom: 8,
            background: "linear-gradient(to right, #9747FF, #6091BD)",
            width: "40px",
            height: "40px",
            borderRadius: "22px",
            border: "none",
            cursor: "pointer",
            outline: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Send style={{ width: "16px", height: "16px", color: "white" }} />
        </button>
      </div>

      <style>
        {`
          textarea::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </form>
  );
}
