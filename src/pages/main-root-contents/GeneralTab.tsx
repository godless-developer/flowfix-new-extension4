import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tasks, Feedback, Office, Settings } from "@/components";
import Question from "../../components/message/Question";
import { useUser } from "@/provider/userProvider";
import { IMessage } from "@/components/message/components";
import { SquarePen } from "lucide-react";

type TabKey = "answer" | "tasks" | "feedback" | "office" | "settings";

export function GeneralTab({ shadow }: { shadow: any }) {
  const { user } = useUser();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const tabs: { key: TabKey; label: string; content: React.ReactNode }[] = [
    {
      key: "answer",
      label: "AI туслах",
      content: (
        <Question
          shadow={shadow}
          messages={messages}
          setMessages={setMessages}
        />
      ),
    },
    {
      key: "tasks",
      label: "Хийх зүйлс",
      content: <Tasks user={user} shadow={shadow} />,
    },
    {
      key: "feedback",
      label: "Санал хүсэлт",
      content: <Feedback user={user} shadow={shadow} />,
    },
    { key: "office", label: "Оффис", content: <Office user={user} /> },
    {
      key: "settings",
      label: "Тохиргоо",
      content: <Settings user={user} shadow={shadow} />,
    },
  ];
  const handleNewChat = () => {
    setMessages([]);
    localStorage.removeItem("chat_messages");
    shadow.showToast("New chat started!", { title: "Info", type: "info" });
  };

  const [active, setActive] = useState<TabKey>("answer");
  const [direction, setDirection] = useState<1 | -1>(1);

  const ids = useMemo(() => {
    return tabs.reduce<Record<TabKey, { tabId: string; panelId: string }>>(
      (acc, t) => {
        acc[t.key] = { tabId: `tab-${t.key}`, panelId: `panel-${t.key}` };
        return acc;
      },
      {} as any
    );
  }, []);

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const styles = {
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      color: "white",
      flexDirection: "column" as const,
      gap: "8px",
      fontFamily: "Inter important!",
    },
    tablistWrap: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "4px",
      overflow: "hidden",
    },
    tablist: {
      display: "flex",
      backgroundColor: "#3c3c3cff",
      borderRadius: "999px",
      gap: "8px",
      alignItems: "center",
      padding: "4px 6px 5px 6px",
      position: "relative" as "relative",
    },
    tab: (selected: boolean): React.CSSProperties => ({
      fontFamily: "Inter important!",
      appearance: "none",
      border: "none",
      background: selected
        ? "linear-gradient(to right, #9747FF, #6091BD)"
        : "transparent",
      color: "#fff",
      padding: "8px 12px",
      borderRadius: "999px",
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 500,
      outline: "none",
      position: "relative",
      // boxShadow: selected
      //   ? "0px 0px 3px 3px rgba(255, 255, 255, 0.58), 0 4px 6px rgba(0,0,0,0.1)"
      //   : "none",
    }),
    panel: {
      height: "100%",
      borderRadius: "16px",
      fontFamily: "Inter",
      fontSize: 14,
      color: "#ffffffff",
      paddingTop: "15px",
      lineHeight: 1.6,
      flex: 1,
      display: "block",
      overflow: "hidden",
      position: "relative",
    },
  };

  const contentVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -40 : 40, opacity: 0 }),
  };

  const tabVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 30 : -30, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -30 : 30, opacity: 0 }),
  };

  const handleTabClick = (newKey: TabKey) => {
    const oldIndex = tabs.findIndex((t) => t.key === active);
    const newIndex = tabs.findIndex((t) => t.key === newKey);
    setDirection(newIndex > oldIndex ? 1 : -1);
    setActive(newKey);
  };

  return (
    <div style={styles.root}>
      {active === "answer" && (
        <button
          onClick={handleNewChat}
          style={{
            position: "absolute",
            top: "4px",
            left: "20px",
            zIndex: 10,
            padding: "7px 9px",
            background: "linear-gradient(to right, #9747FF, #6091BD)",
            border: "none",
            borderRadius: "100%",
            color: "white",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          <SquarePen size={22} />
        </button>
      )}
      <div style={styles.tablistWrap}>
        <div role="tablist" aria-label="General tabs" style={styles.tablist}>
          {tabs.map((t, i) => {
            const selected = t.key === active;
            return (
              <div
                key={t.key}
                style={{ position: "relative", display: "inline-block" }}
              >
                {selected && (
                  <motion.div
                    layoutId="tab-highlight"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: 999,
                      zIndex: -1,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}

                <button
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={ids[t.key].tabId}
                  aria-selected={selected}
                  aria-controls={ids[t.key].panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => handleTabClick(t.key)}
                  style={{
                    ...styles.tab(selected),
                    position: "relative",
                    zIndex: 1,
                    scale: selected ? 1.05 : 1,
                    transition: "transform 0.2s",
                  }}
                >
                  {t.label}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        <AnimatePresence mode="wait" custom={direction}>
          {tabs.map(
            (t) =>
              t.key === active && (
                <motion.div
                  key={t.key}
                  role="tabpanel"
                  id={ids[t.key].panelId}
                  aria-labelledby={ids[t.key].tabId}
                  style={{
                    ...styles.panel,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  {t.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
