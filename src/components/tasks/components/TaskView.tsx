"use client";

import { useState } from "react";
import { CongratsPopup } from "./CongratsPopup";
import { Timeline } from "./TimeLine";
import { TabHeader } from "./Header";
import { TaskContent } from "./Content";

interface Task {
  _id: string;
  title: string;
  createdAt: string;
  checked: boolean;
  type: string;
  description: string;
}

interface TasksViewProps {
  taskItems: Task[];
  showCongrats: boolean;
  onToggle: (_id: string) => void;
  onClaim: () => void;
  onCloseCongrats: () => void;
}

const TAB_ORDER = ["onboarding", "normal", "urgent"] as const;
type TabType = (typeof TAB_ORDER)[number];

export function TasksView({
  taskItems,
  showCongrats,
  onToggle,
  onClaim,
  onCloseCongrats,
}: TasksViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("onboarding");
  const [direction, setDirection] = useState<1 | -1>(1);

  const changeTab = (dir: 1 | -1) => {
    const currentIndex = TAB_ORDER.indexOf(activeTab);
    let newIndex = currentIndex + dir;
    if (newIndex < 0) newIndex = TAB_ORDER.length - 1;
    if (newIndex >= TAB_ORDER.length) newIndex = 0;
    setDirection(dir);
    setActiveTab(TAB_ORDER[newIndex]);
  };

  const filteredTasks = taskItems.filter((t) => t.type === activeTab);
  const completedCount = filteredTasks.filter((t) => t.checked).length;

  return (
    <div style={styles.container}>
      {showCongrats && (
        <CongratsPopup onClaim={onClaim} onClose={onCloseCongrats} />
      )}

      <Timeline activeTab={activeTab} />
      <TabHeader
        activeTab={activeTab}
        changeTab={changeTab}
        completedCount={completedCount}
        filteredTasksLength={filteredTasks.length}
        TAB_ORDER={TAB_ORDER}
      />
      <TaskContent
        filteredTasks={filteredTasks}
        direction={direction}
        onToggle={onToggle}
      />
    </div>
  );
}

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
};
