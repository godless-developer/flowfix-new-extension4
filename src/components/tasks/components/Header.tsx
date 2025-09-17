import { ChevronLeft, ChevronRight } from "lucide-react";
const TAB_ORDER = ["onboarding", "normal", "urgent"] as const;
type TabType = (typeof TAB_ORDER)[number];
interface TabHeaderProps {
  activeTab: TabType;
  changeTab: (_dir: 1 | -1) => void;
  completedCount: number;
  filteredTasksLength: number;
  TAB_ORDER: any;
}

export const TabHeader = ({
  activeTab,
  changeTab,
  TAB_ORDER,
}: TabHeaderProps) => {
  const tabLabels: Record<TabType, string> = {
    onboarding: "Шинэ ажилтан (1 сар)",
    normal: "Туршилтын ажилтан (3 сар)",
    urgent: "Үндсэн ажилтан ",
    // probation: "Full-time (Normal)",
  };

  return (
    <div style={styles.tabNav}>
      <button style={styles.chevronBtnL} onClick={() => changeTab(-1)}>
        <ChevronLeft size={20} />
      </button>
      <h2 style={styles.headerTitle}>{tabLabels[activeTab]}</h2>
      <button style={styles.chevronBtnR} onClick={() => changeTab(1)}>
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    height: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  tabNav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    position: "relative",
  },
  chevronBtnL: {
    position: "absolute",
    left: 20,
    background: "#2a2f3a",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    border: "none",
    borderRadius: "50%",
    padding: "8px",
    cursor: "pointer",
    color: "#fff",
  },
  chevronBtnR: {
    position: "absolute",
    right: 20,
    background: "#2a2f3a",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    border: "none",
    borderRadius: "50%",
    padding: "8px",
    cursor: "pointer",
    color: "#fff",
  },
  headerTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "bolder",
    fontFamily: "Inter",
    letterSpacing: "1px",
    background: "linear-gradient(to right, #1c7ed4 , #2dd4bf)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "8px",
  },
  taskItem: {
    background: "#101522",
    padding: "12px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #333",
    gap: "8px",
  },
  taskLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  taskLabel: {
    cursor: "pointer",
    fontFamily: "Inter",
    fontSize: "14px",
  },
  taskRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  taskMeta: {
    fontFamily: "Inter",
    fontSize: "12px",
  },
};
