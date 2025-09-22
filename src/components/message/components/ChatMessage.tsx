import { addQuestion, deleteQuestion } from "@/api/messageRequest";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import ReactMarkdown from "react-markdown";

declare const chrome: any;
export interface IMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  question?: string;
  thumbsUp?: boolean;
  thumbsDown?: boolean;
}

export function ChatMessage({
  message,
  isLast,
  messages,
  shadow,
  setMessages,
}: {
  message: IMessage;
  messages: IMessage[];
  setMessages: Dispatch<SetStateAction<IMessage[]>>;
  isLast?: boolean;
  shadow: any;
}) {
  const cleanedHtml =
    typeof message.content === "string"
      ? message.content
          .replace(/^html\n?/i, "")
          .replace(/\n?$/i, "")
          .replace(/^html\n?/i, "")
          .trim()
      : "";
  const isUser = message.role === "user";
  if (message.id === "typing") {
    return (
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
          alignSelf: "flex-start",
          maxWidth: "80%",
        }}
      >
        <img
          src={chrome.runtime.getURL("public/blob.png")}
          alt="avatar"
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
          }}
        />
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
    );
  }

  const likeHandleClick = async (thumbs: string) => {
    if (thumbs === "up") {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id
            ? { ...msg, thumbsUp: msg.thumbsUp ? false : true }
            : msg
        )
      );
    } else {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id
            ? { ...msg, thumbsDown: msg.thumbsDown ? false : true }
            : msg
        )
      );
      if (!message.thumbsDown) {
        const id = await addQuestion(message.question!);
        if (!id) return;
        setMessages((prev) =>
          prev.map((msg) => (msg.id === message.id ? { ...msg, id: id } : msg))
        );
        try {
          const response = await addQuestion(message.question!);
          if (response.data.success) {
            shadow.showToast("Info successfully!", {
              title: "Info",
              type: "info",
              duration: 30000,
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        await deleteQuestion(message.id!);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-end",
        gap: "8px",
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "85%",
        animation: isLast ? "slideFadeIn 0.4s ease" : undefined,
      }}
    >
      {!isUser && (
        <img
          src={chrome.runtime.getURL("public/blob.png")}
          alt="avatar"
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            marginBottom: "20px",
          }}
        />
      )}

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            backgroundColor: isUser ? "#CB3CFF" : "#1B202F",
            color: "black",
            padding: isUser ? "6px 14px" : "14px",
            borderRadius: "16px",
            // whiteSpace: "pre-wrap",
            // fontSize: "14px",
            overflowWrap: "break-word",
            // lineHeight: "1.4",
          }}
        >
          {/* <ReactMarkdown
            components={{
              // Headings
              h1: ({ children }) => (
                <h1
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    margin: "8px 0 4px 0",
                    lineHeight: "1.3",
                  }}
                >
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    margin: "8px 0 4px 0",
                    lineHeight: "1.3",
                  }}
                >
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    lineHeight: "1.3",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4
                  style={{ fontSize: "15px", fontWeight: 600, margin: "4px 0" }}
                >
                  {children}
                </h4>
              ),
              h5: ({ children }) => (
                <h5
                  style={{ fontSize: "14px", fontWeight: 600, margin: "4px 0" }}
                >
                  {children}
                </h5>
              ),
              h6: ({ children }) => (
                <h6
                  style={{ fontSize: "13px", fontWeight: 600, margin: "2px 0" }}
                >
                  {children}
                </h6>
              ),

              // Paragraphs
              p: ({ children }) => (
                <p style={{ margin: "4px 0", lineHeight: "1.4" }}>{children}</p>
              ),

              // Inline text
              span: ({ children }) => (
                <span style={{ display: "inline", margin: 0 }}>{children}</span>
              ),
              strong: ({ children }) => (
                <strong style={{ fontWeight: 600 }}>{children}</strong>
              ),
              em: ({ children }) => (
                <em style={{ fontStyle: "italic" }}>{children}</em>
              ),

              // Lists
              ol: ({ children }) => (
                <ol style={{ margin: 0, paddingLeft: "18px" }}>{children}</ol>
              ),
              ul: ({ children }) => (
                <ul style={{ margin: 0, padding: "0px 0px 0px 8px" }}>
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li
                  style={{
                    margin: 0,
                    padding: " 0px 0px 0px 14px",
                    lineHeight: "1.1",
                  }}
                >
                  {children}
                </li>
              ),

              // Code blocks / inline
              code: ({ children }) => (
                <code
                  style={{
                    backgroundColor: "#0c111b",
                    padding: "2px 5px",
                    borderRadius: "4px",
                    fontSize: "13px",
                    textWrap: "wrap",
                  }}
                >
                  {children}
                </code>
              ),

              // Blockquote
              blockquote: ({ children }) => (
                <blockquote
                  style={{
                    borderLeft: "3px solid #4f8cff",
                    margin: "6px 0",
                    paddingLeft: "10px",
                    color: "#cbd5e1",
                    fontStyle: "italic",
                  }}
                >
                  {children}
                </blockquote>
              ),

              // Links
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#4f8cff", textDecoration: "underline" }}
                >
                  {children}
                </a>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown> */}
          <div
            dangerouslySetInnerHTML={{
              __html: cleanedHtml,
            }}
          />
        </div>

        {!isUser && (
          <div
            style={{
              display: "flex",
              gap: "6px",
              marginTop: "4px",
              marginLeft: "8px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: "2px",
                cursor: "pointer",
              }}
              onClick={() => likeHandleClick("up")}
              hidden={message.thumbsDown}
            >
              <ThumbsUp size={14} fill={message.thumbsUp ? "white" : ""} />
            </div>
            <div
              style={{
                padding: "2px",
                cursor: "pointer",
                marginTop: "2px",
              }}
              onClick={() => likeHandleClick("down")}
              hidden={message.thumbsUp}
            >
              <ThumbsDown size={14} fill={message.thumbsDown ? "white" : ""} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
