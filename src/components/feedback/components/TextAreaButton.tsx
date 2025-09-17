"use client";
import { ArrowDownCircle } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

type TextAreaButtonProps = {
  text: string;
  setText: (val: string) => void;
  disabled: boolean;
  loading: boolean;
  anon: boolean;
  onSubmit: () => void;
  selectedCats: string[];
  handleViewMyFeedbacks: () => void;
};

export function TextAreaButton({
  text,
  setText,
  disabled,
  loading,
  anon,
  onSubmit,
  selectedCats,
  handleViewMyFeedbacks,
}: TextAreaButtonProps) {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <textarea
          placeholder="Таны санал хүсэлт..."
          style={{
            minHeight: 205,
            padding: 12,
            borderRadius: 10,
            border: "1px solid #2a2f3a",
            background: "#0c111b",
            color: "#e6e6e6",
            outline: "none",
            resize: "vertical",
          }}
          disabled={disabled}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "10px 14px",
              background: "linear-gradient(to right, #9747FF, #6091BD)",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              color: "#fff",
              fontWeight: 400,
              alignSelf: "flex-start",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              textAlign: "center",
              gap: "4px",
            }}
            onClick={handleViewMyFeedbacks}
          >
            <ArrowDownCircle size={20} />
            <p
              style={{ margin: 0, paddingTop: "2px", fontFamily: "monospace" }}
            >
              Санал хүсэлтүүд
            </p>
          </motion.button>
          <button
            style={{
              padding: "15px",
              borderRadius: 8,
              border: "none",
              cursor:
                loading || text.length === 0 || selectedCats.length === 0
                  ? "not-allowed"
                  : "pointer",
              fontWeight: 600,
              transition: "all 0.2s ease",
              fontFamily: "monospace",
              background:
                loading || text.length === 0 || selectedCats.length === 0
                  ? "linear-gradient(to right, #b47ffaff, #77b7f0ff)"
                  : "linear-gradient(to right, #9747FF, #6091BD)",
              color: anon ? "#ddd" : "#fff",
              width: "fit-content",
              height: "full",
              opacity:
                loading || text.length === 0 || selectedCats.length === 0
                  ? 0.6
                  : 1,
            }}
            onClick={onSubmit}
            disabled={loading || text.length === 0 || selectedCats.length === 0}
          >
            {anon ? "Нэргүй илгээх" : "Илгээх"}
          </button>
        </div>
      </div>
    </>
  );
}
