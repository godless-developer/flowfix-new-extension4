import React from "react";
declare const chrome: any;

export const StepBubble = ({
  text,
  left,
  bottom,
  textLeft,
  union,
}: {
  text: React.ReactNode;
  bottom: string;
  left: string;
  textLeft: string;
  union: string;
}) => (
  <>
    {union === "union" ? (
      <img
        src={chrome.runtime.getURL("public/Union2.png")}
        alt="Open Popover"
        style={{
          position: "absolute",
          top: bottom,
          left: left,
          width: "300px",
          height: "auto",
          objectFit: "cover",
          zIndex: 100,
        }}
      />
    ) : (
      <img
        src={chrome.runtime.getURL("public/Union.png")}
        alt="Open Popover"
        style={{
          position: "absolute",
          top: bottom,
          left: left,
          width: "300px",
          height: "auto",
          objectFit: "cover",
          zIndex: 100,
        }}
      />
    )}
    <p
      style={{
        position: "absolute",
        top: bottom,
        left: textLeft,
        zIndex: 200,
        fontSize: "16px",
        fontWeight: 400,
        color: "#000000",
        margin: "20px 0px",
        textAlign: "center",
      }}
    >
      {text}
    </p>
  </>
);
