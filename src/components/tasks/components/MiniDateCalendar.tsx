import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MiniDateCalendarProps = {
  value?: Date | null;
  onChange?: (date: Date) => void;
  initialYear?: number;
  initialMonth?: number;
  weekStartsOn?: 0 | 1; // 0 = Sunday, 1 = Monday
};

export default function MiniDateCalendar({
  value = null,
  onChange,
  initialYear,
  initialMonth,
  weekStartsOn = 0,
}: MiniDateCalendarProps) {
  const today = new Date();
  const [cursor, setCursor] = useState(() => {
    const base = value ?? new Date();
    return new Date(
      initialYear ?? base.getFullYear(),
      initialMonth ?? base.getMonth(),
      1
    );
  });

  const [direction, setDirection] = useState<"left" | "right">("right");

  const weeks = useMemo(
    () => buildMonthGrid(cursor, weekStartsOn),
    [cursor, weekStartsOn]
  );

  const selectedKey = value ? key(value) : null;
  const todayKey = key(today);
  const monthLabel = `${cursor.getMonth() + 1}-сар ${cursor.getFullYear()}`;
  const dow = labelsForDow(weekStartsOn);

  const variants = {
    enter: (dir: "left" | "right") => ({
      x: dir === "right" ? 300 : -300,
      opacity: 0,
      position: "absolute" as const,
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative" as const,
    },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? -300 : 300,
      opacity: 0,
      position: "absolute" as const,
    }),
  };

  const paginate = (newCursor: Date, dir: "left" | "right") => {
    setDirection(dir);
    setCursor(newCursor);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button
          aria-label="Previous month"
          onClick={() =>
            paginate(
              new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1),
              "left"
            )
          }
          style={styles.navBtn}
        >
          <ChevronLeft />
        </button>

        <div style={styles.monthLabel}>{monthLabel}</div>

        <button
          aria-label="Next month"
          onClick={() =>
            paginate(
              new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1),
              "right"
            )
          }
          style={styles.navBtn}
        >
          <ChevronRight />
        </button>
      </div>

      {/* Calendar body with animation */}
      <div style={{ position: "relative", height: 300, overflow: "hidden" }}>
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={cursor.getMonth() + "-" + cursor.getFullYear()}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35 }}
            style={{ width: "100%" }}
          >
            <div style={styles.grid}>
              {dow.map((d) => (
                <div key={d} style={{ ...styles.cell, ...styles.dow }}>
                  {d}
                </div>
              ))}

              {weeks.map((day) => {
                const isOutside = day.month !== cursor.getMonth();
                const k = key(day.date);
                const isSelected = selectedKey === k;
                const isToday = todayKey === k;

                return (
                  <button
                    key={k}
                    onClick={() => onChange?.(day.date)}
                    style={{
                      ...styles.cell,
                      ...styles.dayBtn,
                      opacity: isOutside ? 0.45 : 1,
                      border: isSelected
                        ? "2px solid #0BA42C"
                        : "1px solid #ebebeb",
                      background:
                        isToday && !isSelected ? "#0BA42C" : "transparent",
                      color:
                        isToday && !isSelected
                          ? "#fff"
                          : isSelected
                          ? "#111"
                          : "#111",
                    }}
                  >
                    <span style={styles.dayNum}>{day.date.getDate()}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* --- Utils --- */
function buildMonthGrid(base: Date, weekStartsOn: 0 | 1) {
  const year = base.getFullYear();
  const month = base.getMonth();
  const startOfMonth = new Date(year, month, 1);
  const startDow = startOfMonth.getDay();
  const offset = (startDow - weekStartsOn + 7) % 7;
  const firstCell = addDays(startOfMonth, -offset);
  const cells = 35;
  const days: { date: Date; month: number }[] = [];
  for (let i = 0; i < cells; i++) {
    const d = addDays(firstCell, i);
    days.push({ date: d, month: d.getMonth() });
  }
  return days;
}
function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}
function key(d: Date) {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
function labelsForDow(weekStartsOn: 0 | 1) {
  const base = ["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"];
  if (weekStartsOn === 0) return base;
  return [...base.slice(1), base[0]];
}
function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* --- Styles --- */
const styles: Record<string, React.CSSProperties> = {
  container: {
    width: 361,
    maxHeight: 372,
    padding: "0px 4px",
    borderRadius: 16,
    border: "1px solid #0000001A",
    background: "#fff",
    color: "#111",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans"',
    userSelect: "none",
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "10px 8px",
    gap: 6,
  },
  navBtn: {
    appearance: "none",
    border: "0px solid #e5e7eb",
    background: "#fff",
    width: 32,
    height: 32,
    borderRadius: 8,
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
  },
  monthLabel: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    color: "black",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 6,
    padding: "12px",
  },
  cell: {
    height: 40,
    width: "auto",
    display: "grid",
    placeItems: "center",
    fontSize: 12,
  },
  dow: {
    color: "#3C454A99",
  },
  dayBtn: {
    appearance: "none",
    borderRadius: 50,
    cursor: "pointer",
    transition: "all .2s ease",
    outline: "none",
  },
  dayNum: {
    lineHeight: 1,
    fontSize: 14,
  },
};
