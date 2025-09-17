import { useEffect, useState } from "react";
import { Form } from "./Form";
import { Profile } from "./Profile";

declare const chrome: any;

type SettingsViewProps = {
  formData: any;
  avatarIndex: number;
  sampleAvatars: string[];
  hasChanges: boolean;
  onChange: (key: string, value: string) => void;
  onAvatarChange: (dir: "left" | "right") => void;
  onSave: () => void;
  user: any;
};

export function SettingsView({
  formData,
  avatarIndex,
  sampleAvatars,
  hasChanges,
  onChange,
  onAvatarChange,
  user,
  onSave,
}: SettingsViewProps) {
  return (
    <div style={styles.container}>
      <Profile
        avatarIndex={avatarIndex}
        sampleAvatars={sampleAvatars}
        onAvatarChange={onAvatarChange}
        formData={formData}
      />
      <Form formData={formData} onChange={onChange} />
      <button
        style={{
          ...styles.saveBtn,
          background: hasChanges
            ? "linear-gradient(to right, #9747FF, #6091BD)"
            : "#0c111b",
          cursor: hasChanges ? "pointer" : "not-allowed",
        }}
        disabled={!hasChanges}
        onClick={onSave}
      >
        Хадгалах
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "16px",
    fontFamily: "Inter",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  saveBtn: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "none",
    fontWeight: 600,
    fontFamily: "Inter",
    transition: "all 0.2s ease",
    color: "#fff",
  },
};
