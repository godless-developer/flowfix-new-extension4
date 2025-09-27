"use client";

import React, { useState } from "react";

type SwitchProps = {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};

const Switch: React.FC<SwitchProps> = ({
  checked = false,
  disabled,
  onChange,
}) => {
  const [isOn, setIsOn] = useState(checked);

  const toggle = () => {
    if (disabled) return;
    const newValue = !isOn;
    setIsOn(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      onClick={toggle}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: isOn ? "flex-end" : "flex-start",
        width: "44px", // ~32px
        height: "26px", // ~18px
        borderRadius: "9999px",
        backgroundColor: isOn ? "#65c466" : "#e5e7eb", // blue-500 / gray-200
        border: "1px solid transparent",
        padding: "2px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.2s ease-in-out",
      }}
    >
      <span
        style={{
          width: "22px", // ~16px
          height: "22px",
          borderRadius: "9999px",
          backgroundColor: isOn ? "#ffffff" : "#ffffff", // white / gray-900
          transform: isOn ? "translateX(0)" : "translateX(0)",
          transition:
            "transform 0.5s ease-in-out, background-color 0.5s ease-in-out",
        }}
      />
    </button>
  );
};

export { Switch };
