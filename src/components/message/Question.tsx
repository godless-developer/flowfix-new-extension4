"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@/provider/userProvider";
import { sendMessageReq } from "@/api/messageRequest";
import { v4 as uuidv4 } from "uuid";
import { ChatForm, ChatMessage, IMessage } from "./components";

declare const chrome: any;

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

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chat_messages", JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    const userMsg = { role: "user" as const, content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

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

  const handleDefaultQuestionClick = (text: string) => {
    sendMessage(text);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        fontFamily: "Inter,Inter, sans-serif",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {showDefaultQuestions && (
        <div
          style={{
            padding: "40px 12px",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          {defaultQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleDefaultQuestionClick(q)}
              style={{
                padding: "8px 12px",
                borderRadius: "20px",
                border: "1px solid #9747FF",
                background: "transparent",
                color: "white",
                cursor: "pointer",
                fontFamily: "Inter important!",
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
