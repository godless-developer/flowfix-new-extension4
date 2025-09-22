import React from "react";

export const StepBubble = ({
  text,
  left,
  bottom,
  rotate,
}: {
  text: React.ReactNode;
  bottom: string;
  left: string;
  rotate: string;
}) => (
  <div
    style={{
      position: "relative",
      border: "1px solid #ddd",
      borderRadius: "16px",
      padding: "16px 20px",
      justifyContent: "center",
      alignItems: "center",
      display: "inline-block",
      marginBottom: "16px",
      backgroundColor: "white",
      width: "294px",
      height: "55px",
    }}
  >
    <div
      style={{
        position: "absolute",
        bottom: bottom,
        left: left,
        width: 0,
        height: 0,
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        borderTop: "10px solid #ddd",
        rotate: rotate,
      }}
    />
    <p
      style={{
        fontSize: "16px",
        fontWeight: 400,
        color: "#000000",
        margin: "10px 0px ",
        textAlign: "center",
      }}
    >
      {text}
    </p>
  </div>
);
