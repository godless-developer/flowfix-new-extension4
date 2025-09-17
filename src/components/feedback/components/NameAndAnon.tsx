"use client";
import React, { useMemo } from "react";

type NameAndAnonProps = {
  name: string;
  avatarUrl?: string;
  anon: boolean;
  toggle: () => void;
};

export function NameAndAnon({
  name,
  avatarUrl,
  anon,
  toggle,
}: NameAndAnonProps) {
  const DefaultAvatar = (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{
        width: 32,
        height: 32,
        opacity: anon ? 0.9 : 0.7,
        transition: "opacity 200ms ease",
      }}
    >
      <circle cx="12" cy="8" r="4" fill="#8a93a5" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="#8a93a5" />
    </svg>
  );

  const shownName = anon ? "Нэргүй" : name;

  const avatarNode = useMemo(() => {
    if (anon || !avatarUrl) return DefaultAvatar;
    return (
      <img
        src={avatarUrl}
        alt={`${name} avatar`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "filter 200ms ease, opacity 200ms ease",
          filter: anon ? "grayscale(100%) blur(1.5px)" : "none",
          opacity: anon ? 0.85 : 1,
        }}
      />
    );
  }, [anon, avatarUrl, name]);

  const onKeyDown: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            overflow: "hidden",
            border: "1px solid #2a2f3a",
            flexShrink: 0,
            background: "#1a2233",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {avatarNode}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              margin: 0,
              fontWeight: 700,
              fontFamily: "Inter",
              letterSpacing: 0.2,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              maxWidth: 220,
              color: "#f2f2f2",
            }}
          >
            {shownName}
          </span>
          <span
            style={{
              margin: 0,
              fontSize: 12,
              color: "#9aa3b2",
              fontFamily: "Inter",
            }}
          >
            {anon ? "Таны хэн болохыг нуусан байна" : "Нээлттэй"}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span
          style={{
            fontSize: 14,
            color: "#c8d0dc",
            fontFamily: "Inter",
          }}
        >
          Нууцлах
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={anon}
          onClick={toggle}
          onKeyDown={onKeyDown}
          style={{
            position: "relative",
            width: 56,
            height: 32,
            borderRadius: 999,
            border: "1px solid #2a2f3a",
            background: anon
              ? "linear-gradient(90deg, #6366f1, #a855f7)"
              : "linear-gradient(90deg, #222738, #1a1f2e)",
            cursor: "pointer",
            transition: "background 180ms ease, border-color 180ms ease",
            outline: "none",
            boxShadow: anon ? "0 0 0 3px rgba(99,102,241,0.25)" : "none",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "2.2px",
              left: anon ? 26 : 2,
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "#fff",
              transition: "left 180ms ease",
              boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
            }}
          />
        </button>
      </div>
    </div>
  );
}
