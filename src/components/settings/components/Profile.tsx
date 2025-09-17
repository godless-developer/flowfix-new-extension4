"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

declare const chrome: any;
interface ProfileProps {
  formData: any;
  avatarIndex: number;
  sampleAvatars: string[];
  onAvatarChange: (dir: "left" | "right") => void;
}
export function Profile({
  formData,
  onAvatarChange,
  sampleAvatars,
  avatarIndex,
}: ProfileProps) {
  const calcWorkedYears = () => {
    if (!formData.startedJobAt) return "";
    const start = new Date(formData.startedJobAt);
    if (isNaN(start.getTime())) return "";

    const now = new Date();
    const diff = now.getTime() - start.getTime();
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(
      (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
    );
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return `${years} жил ${months} сар ${days} хоног`;
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={styles.card}>
        <img
          src={chrome.runtime.getURL("public/favicon.png")}
          alt="logo"
          width={50}
          height={50}
          style={{
            position: "absolute",
            right: "20px",
            top: "20px",
          }}
        />
        <div>
          <h3 style={styles.cardTitle}>
            {formData.first_name} {formData.last_name}
          </h3>
          <p style={styles.cardInfo}>
            <strong>Албан тушаал:</strong> {formData.department || "-"}
          </p>
          <p style={styles.cardInfo}>
            <strong>Хэлтэс:</strong>
            {formData.position || "-"}
          </p>
        </div>
        <div>
          <p style={styles.cardInfo}>
            <strong>Эрх/Role:</strong> {formData.user_role || "-"}
          </p>
          <p style={styles.cardInfo}>
            <strong>Ажилд орсон:</strong>{" "}
            {formData.startedJobAt
              ? new Date(formData.startedJobAt).toLocaleDateString()
              : "-"}
          </p>
          <p style={styles.cardInfo}>
            <strong>Нийт ажилласан хугацаа:</strong> {calcWorkedYears()}
          </p>
        </div>
      </div>
      <div style={styles.avatarWrap}>
        <button style={styles.avatarBtn} onClick={() => onAvatarChange("left")}>
          <ChevronLeft size={20} />
        </button>
        <img
          src={formData.profile_img || sampleAvatars[avatarIndex]}
          alt=""
          style={styles.avatar}
        />
        <button
          style={styles.avatarBtn}
          onClick={() => onAvatarChange("right")}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    borderRadius: "12px",
    padding: "20px",
    paddingRight: "100px",
    border: "1px solid #2a2f3a",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
    position: "relative",
  },
  cardTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#fff",
  },
  cardInfo: {
    fontSize: "14px",
    margin: "4px 0",
    color: "#ccc",
  },
  avatarWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    paddingRight: "50px",
  },
  avatar: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "2px solid #444",
    objectFit: "cover",
  },
  avatarBtn: {
    background: "#2a2f3a",
    border: "none",
    borderRadius: "50%",
    padding: "6px",
    cursor: "pointer",
    color: "#fff",
  },
};
