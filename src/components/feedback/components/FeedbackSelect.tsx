import React, { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  value?: string[];
  onChange?: (values: string[]) => void;
}

export function FeedbackSelect({
  options,
  onChange,
  value = [],
}: DropdownProps) {
  const toggleSelect = (val: any) => {
    onChange?.(val === value ? "" : val);
  };

  return (
    <div style={{ width: "100%" }}>
      <label
        style={{
          display: "block",
          marginBottom: 8,
          fontSize: 14,
          color: "#c8d0dc",
          fontFamily: "Inter",
        }}
      >
        <p>Категори</p>
      </label>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          width: "100%",
        }}
      >
        {options.map((opt) => {
          const isActive = value.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleSelect(opt.value)}
              style={{
                flex: "1 1 calc(33% - 10px)",
                minWidth: "120px",
                padding: "10px 12px",
                borderRadius: 10,
                border: `1px solid ${isActive ? "#4f8cff" : "#2a2f3a"}`,
                background: isActive ? "#1a2233" : "#0c111b",
                color: "#e6e6e6",
                textAlign: "center",
                cursor: "pointer",
                position: "relative",
                fontFamily: "Inter",
              }}
            >
              {opt.label}
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  ✔
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
