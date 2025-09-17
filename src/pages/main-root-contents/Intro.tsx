("use client");
import React, { useEffect, useState } from "react";

declare const chrome: any;

const insertLineBreakAfter = (text: string, word: string) => {
  const parts = text.split(word);
  if (parts.length < 2) return text;
  return (
    <>
      {parts[0]}
      {word}
      <br />
      {parts[1]}
    </>
  );
};

const onboardingSteps = [
  {
    text: insertLineBreakAfter(
      'Сайн уу, би чиний "Work buddy" чинь байна.',
      "чиний"
    ),
  },
  {
    text: insertLineBreakAfter(
      "Мэдэхгүй зүйлээ надаас асууж байгаарай",
      "асууж"
    ),
  },
  {
    text: insertLineBreakAfter(
      "Би доорх төрлийн асуултуудад хариулж чадна",
      "асуултуудад"
    ),
    bullets: [
      {
        title: "Компанийн дотоод дүрэм, гэрээ",
        number: 1,
        style: {
          backgroundColor: "#2C4CEC",
          boxShadow: "-2px -2px 4px 0px rgba(0, 0, 0, 0.25) inset",
        },
        subtitle: insertLineBreakAfter(
          "Түлхүүр үг ашиглан хялбархан хэрэгтэй мэдээллээ асуух боломжтой",
          "асуух"
        ),
      },
      {
        title: "Оффисын талаар",
        number: 2,
        style: {
          backgroundColor: "#FFAA21",
          boxShadow: "-2px -2px 4px 0px rgba(0, 0, 0, 0.25) inset",
        },
        subtitle: insertLineBreakAfter(
          "Ямар нэг зүйл олохгүй, мэдэхгүй бол санаа зоволгүй асуугаарай",
          "зоволгүй"
        ),
      },
      {
        title: "Ажлын талаар бүхий л зүйлс",
        number: 3,
        style: {
          backgroundColor: "#02C04B",
          boxShadow: "-2px -2px 4px 0px rgba(0, 0, 0, 0.25) inset",
        },
        subtitle: insertLineBreakAfter(
          "Хэдэн цаг тардаг, яаж чөлөө авдаг вэ гэдгийг ч асуух боломжтой",
          "асуух"
        ),
      },
    ],
  },
];

export function Intro({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const [animationState, setAnimationState] = useState<"enter" | "exit">(
    "enter"
  );
  const current = onboardingSteps[step];

  useEffect(() => {
    setAnimationState("enter");
  }, [step]);

  const handleNext = () => {
    if (step < onboardingSteps.length - 1) {
      setAnimationState("exit");
      setTimeout(() => {
        setStep((prev) => prev + 1);
        setAnimationState("enter");
      }, 500);
    } else {
      setAnimationState("exit");
      setTimeout(() => {
        onFinish();
      }, 500);
    }
  };

  const handleSkip = () => {
    setAnimationState("exit");
    setTimeout(() => {
      onFinish();
    }, 500);
  };

  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        justifyContent: current.bullets ? "center" : "space-between",
        alignItems: "center",
        borderColor: "#c6c6c6",
        border: "1px solid #c6c6c6",
        borderRadius: "24px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        padding: "24px 32px",
        animation:
          animationState === "enter"
            ? "fadeSlideIn 0.5s ease forwards"
            : "fadeSlideOut 0.5s ease forwards",
      }}
    >
      <div
        style={{
          marginTop: current.bullets ? "40px" : "220px",
          maxWidth: "700px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            border: "1px solid #ddd",
            borderRadius: "16px",
            padding: "16px 20px",
            display: "inline-block",
            marginBottom: "16px",
            backgroundColor: "white",
            width: "294px",
            minHeight: "78px",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "80px",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "10px solid #ddd",
            }}
          />

          <p
            style={{
              fontSize: "16px",
              fontWeight: 400,
              color: "#000000",
              margin: 0,
              textAlign: "center",
              fontStyle: "normal",
            }}
          >
            {current.text}
          </p>
        </div>

        <img
          src={chrome.runtime.getURL("/public/frog.png")}
          alt="Frog"
          width="100"
          height="100"
          style={{ display: "block", margin: "0 auto" }}
        />
      </div>

      {current.bullets && (
        <div
          style={{
            textAlign: "left",
            maxWidth: "600px",
            marginBottom: "24px",
          }}
        >
          {current.bullets.map((item, idx) => {
            const extraStyle = item.style || {};
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    ...extraStyle,
                    borderRadius: "8px",
                    color: "white",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    fontWeight: 700,
                    fontFamily: "Inter , sans-serif",
                    marginBottom: "20px",
                  }}
                >
                  {item.number}
                </div>
                <div style={{ marginBottom: "16px", fontFamily: "SF Pro" }}>
                  <strong
                    style={{
                      fontSize: "16px",
                      fontWeight: 510,
                      fontStyle: "normal",
                      color: "#000000",
                    }}
                  >
                    {item.title}
                  </strong>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      color: "#000000",
                      opacity: "60%",
                    }}
                  >
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "0px 10px",
        }}
      >
        <button
          onClick={handleSkip}
          style={{
            background: "none",
            border: "none",
            color: "#000000",
            opacity: "60%",
            textDecoration: "underline",
            fontSize: "16px",
            fontWeight: 400,
            cursor: "pointer",
            outline: "none",
            boxShadow: "none",
          }}
        >
          Алгасах
        </button>
        <button
          onClick={handleNext}
          style={{
            backgroundColor: "#684dff",
            border: "none",
            borderRadius: "24px",
            color: "white",
            padding: "10px 16px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: 410,
            outline: "none",
            boxShadow: "none",
          }}
        >
          Үргэлжлүүлэх
        </button>
      </div>

      <style>
        {`
          @keyframes fadeSlideIn {
            from {
              opacity: 0;
              transform: translateX(60px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeSlideOut {
            from {
              opacity: 1;
              transform: translateX(0);
            }
            to {
              opacity: 0;
              transform: translateX(-60px);
            }
          }
        `}
      </style>
    </div>
  );
}
