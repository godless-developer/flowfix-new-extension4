"use client";
import React, { useEffect, useState } from "react";
import { onboardingSteps } from "./onboardingSteps";
import { StepBubble } from "./StepBubble";
import { Bullets } from "./Bullets";
import { Controls } from "./Controls";

declare const chrome: any;

export function Intro({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const [animationState, setAnimationState] = useState<"enter" | "exit">(
    "enter"
  );
  const current = onboardingSteps[step];

  useEffect(() => setAnimationState("enter"), [step]);

  const next = () => {
    if (step < onboardingSteps.length - 1) {
      setAnimationState("exit");
      setTimeout(() => {
        setStep((s) => s + 1);
        setAnimationState("enter");
      }, 500);
    } else {
      setAnimationState("exit");
      setTimeout(onFinish, 500);
    }
  };

  const skip = () => {
    setAnimationState("exit");
    setTimeout(onFinish, 500);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        justifyContent: current.bullets ? "center" : "space-between",
        alignItems: "center",
        padding: "24px 32px",
        animation:
          animationState === "enter"
            ? "fadeSlideIn 0.5s ease forwards"
            : "fadeSlideOut 0.5s ease forwards",
      }}
    >
      <div
        style={{
          marginTop: current.bullets ? "30px" : "160px",
          marginRight: current.bullets ? "200px" : "0px",
          gap: current.bullets ? "20px" : "",
          textAlign: "center",
          display: current.bullets ? "flex" : "",
          flexDirection: current.bullets ? "row-reverse" : "column",
        }}
      >
        <StepBubble
          text={current.text}
          bottom={current.bullets ? "30px" : "-10px"}
          left={current.bullets ? "-15px" : "80px"}
          rotate={current.bullets ? "90deg" : ""}
        />
        <img
          src={chrome.runtime.getURL("/public/avatarr.png")}
          alt="Frog"
          width="100"
          height="140"
          style={{ display: "block", margin: "0 auto" }}
        />
      </div>

      {current.bullets && <Bullets bullets={current.bullets} />}
      <Controls onNext={next} onSkip={skip} />

      <style>
        {`
          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateX(60px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeSlideOut {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(-60px); }
          }
        `}
      </style>
    </div>
  );
}
