import { motion } from "framer-motion";
import { Lock, Unlock } from "lucide-react";

interface TimelineProps {
  activeTab: TabType;
}
const TAB_ORDER = ["onboarding", "normal", "urgent"] as const;
type TabType = (typeof TAB_ORDER)[number];

export const Timeline = ({ activeTab }: TimelineProps) => {
  const timelineStages = [
    { key: "onboarding", label: "Шинэ ажилтан", duration: "1 сар" },
    { key: "normal", label: "Туршилтын ажилтан", duration: "3 сар" },
    { key: "urgent", label: "Үндсэн ажилтан", duration: "" },
  ];

  const activeIndex =
    activeTab === "normal"
      ? 1
      : activeTab === "urgent"
      ? 2
      : TAB_ORDER.indexOf(activeTab);

  return (
    <div style={styles.timelineWrap}>
      {timelineStages.map((stage, idx) => {
        const isUnlocked = idx <= activeIndex;
        return (
          <div key={stage.key} style={styles.timelineStage}>
            <motion.div
              className="circle"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "2px solid #1c7ed4",
                background: isUnlocked
                  ? "linear-gradient(135deg,#1c7ed4,#2dd4bf)"
                  : "#101522",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                position: "relative",
              }}
            >
              <motion.div
                key={isUnlocked ? "unlock" : "lock"}
                initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                {isUnlocked ? (
                  <Unlock size={16} color="#fff" />
                ) : (
                  <Lock size={16} color="#aaa" />
                )}
              </motion.div>
            </motion.div>

            <span style={styles.timelineLabel}>
              {stage.label}
              {stage.duration && (
                <span style={{ fontSize: "11px", color: "#aaa" }}>
                  {" "}
                  – {stage.duration}
                </span>
              )}
            </span>

            {idx < timelineStages.length - 1 && (
              <motion.div
                className="line"
                style={{
                  flex: 1,
                  height: 3,
                  background:
                    idx < activeIndex
                      ? "linear-gradient(to right,#1c7ed4,#2dd4bf)"
                      : "#333",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  timelineWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    paddingLeft: "100px",
  },
  timelineStage: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    gap: "8px",
    position: "relative",
  },
  timelineLabel: {
    fontSize: "12px",
    fontFamily: "Inter",
    color: "#ddd",
    whiteSpace: "nowrap",
  },
};
