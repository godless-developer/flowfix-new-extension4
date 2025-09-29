"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@/provider/userProvider";
import { v4 as uuidv4 } from "uuid";
import { ChatForm, ChatMessage, IMessage } from "./components";
import { sendMessageReq } from "./components/sendMessageReq";

export default function Question({
  compactMode = false,
  mockMode = false,
  shadow,
  messages,
  setMessages,
}: {
  compactMode?: boolean;
  mockMode?: boolean;
  shadow: any;
  messages: IMessage[];
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
}) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const defaultQuestions = [
    "Байгууллагын дотоод журам юу вэ?",
    "Хөдөлмөрийн гэрээ цуцалж болох уу? давуу болон сул тал?",
    "Анхны журамын файл хаана байна?",
    "Цалингийн задаргаа хэрхэн авах вэ?",
    "Байгууллагын үнэт зүйлс юу вэ?",
    "Яаж чөлөө авах вэ?",
  ];

  const showDefaultQuestions = messages.length === 0;

  // хадгалах
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chat_messages", JSON.stringify(messages));
    }
  }, [messages]);

  // сэргээх
  useEffect(() => {
    const saved = localStorage.getItem("chat_messages");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  const sendMessage = async (text: string) => {
    const userMsg = { role: "user" as const, content: text };
    setMessages((prev) => [...prev, userMsg]);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "typing...", id: "typing" },
    ]);

    if (mockMode) {
      setTimeout(() => {
        setMessages((prev) =>
          prev
            .filter((m) => m.id !== "typing")
            .concat({
              role: "assistant",
              content: `This is a mock reply to: "${text}"`,
              id: uuidv4(),
            })
        );
        setLoading(false);
      }, 800);
      return;
    }

    try {
      setLoading(true);
      const res = await sendMessageReq(text, user!);

      setMessages((prev) =>
        prev
          .filter((m) => m.id !== "typing")
          .concat({
            id: uuidv4(),
            role: "assistant",
            content: res,
            question: text,
            thumbsDown: false,
            thumbsUp: false,
          })
      );
    } catch (error) {
      console.log(error);
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== "typing")
          .concat({
            role: "assistant",
            content: "⚠️ Error: server response failed",
            id: uuidv4(),
          })
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        color: "white",
        padding: "0px 20px 20px 20px",
      }}
    >
      {showDefaultQuestions && (
        <div
          style={{
            padding: "12px 12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <p style={{ color: "#7f7f7f", fontSize: "16px", margin: 0 }}>
            Жишээ асуултууд:
          </p>
          {defaultQuestions.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              style={{
                padding: "10px 12px",
                borderRadius: "20px",
                border: "1px solid #0000001a",
                background: "transparent",
                color: "#6b7280",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div
        ref={scrollRef}
        style={{
          flexGrow: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: compactMode ? "6px" : "12px",
          padding: "0 8px 8px",
          maxHeight: "470px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {messages.map((m, i) => (
          <ChatMessage
            key={m.id || i}
            message={m}
            isLast={i === messages.length - 1}
            shadow={shadow}
            setMessages={setMessages}
            messages={messages}
          />
        ))}
      </div>
      <div style={{ paddingBottom: "16px" }}>
        <ChatForm onSend={sendMessage} />
      </div>
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
}
