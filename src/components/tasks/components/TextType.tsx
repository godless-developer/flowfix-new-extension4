import React, { useEffect, useState } from "react";

type TextTypeProps = {
  text: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  textColors?: string[];
};

export const TextType: React.FC<TextTypeProps> = ({
  text,
  typingSpeed = 75,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "|",
  textColors = ["#000"],
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping && charIndex < text[currentTextIndex].length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentTextIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (isTyping && charIndex === text[currentTextIndex].length) {
      setIsTyping(false);
      timeout = setTimeout(() => {
        setIsTyping(true);
        setDisplayedText("");
        setCharIndex(0);
        setCurrentTextIndex((prev) => (prev + 1) % text.length);
      }, pauseDuration);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isTyping, currentTextIndex, text, typingSpeed, pauseDuration]);

  const color =
    textColors[currentTextIndex % textColors.length] || textColors[0];
  //#86599C, #599AC2
  return (
    <span
      style={{
        // color,
        fontSize: "20px",
        fontWeight: "bold",
        background: `linear-gradient(90deg, ${textColors})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {displayedText}
      {showCursor && <span>{cursorCharacter}</span>}
    </span>
  );
};
