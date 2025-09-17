import { Calendar, Dot, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  _id: string;
  title: string;
  createdAt: string;
  checked: boolean;
  type: string;
  description: string;
}
interface TaskContentProps {
  filteredTasks: Task[];
  direction: 1 | -1;
  onToggle: (_id: string) => void;
}

export const TaskContent = ({
  filteredTasks,
  direction,
  onToggle,
}: TaskContentProps) => {
  const contentVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  const completedCount = filteredTasks.filter((t) => t.checked).length;

  return (
    <div style={{ position: "relative", flex: 1 }}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={filteredTasks.map((t) => t._id).join(",")}
          custom={direction}
          variants={contentVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <div style={styles.taskList}>
            {filteredTasks.map((task) => (
              <div key={task._id} style={styles.taskItem}>
                <div style={styles.taskLeft}>
                  <label style={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      id={`task-${task._id}`}
                      checked={task.checked}
                      onChange={() => onToggle(task._id)}
                      style={styles.hiddenCheckbox}
                      disabled={task.checked}
                    />
                    <span
                      style={{
                        ...styles.customCheckbox,
                        background: task.checked
                          ? "linear-gradient(115deg, #9747FF, #6091BD)"
                          : "#101522",
                        borderColor: task.checked ? "transparent" : "#555",
                      }}
                    >
                      {task.checked && <span style={styles.checkMark}>✓</span>}
                    </span>
                  </label>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label
                      htmlFor={`task-${task._id}`}
                      style={styles.taskLabel}
                    >
                      {task.title}
                    </label>
                    <span style={{ fontSize: "12px", color: "#6d6d6dff" }}>
                      {task.description}
                    </span>
                  </div>
                </div>
                <div style={styles.taskRight}>
                  <Calendar size={16} />
                  <span style={styles.taskMeta}>
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                  <Dot size={16} />
                  <span style={styles.taskMeta}>
                    {new Date(task.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: "Inter", fontSize: "12px", color: "#888" }}>
            Гүйцэтгэл {completedCount}/{filteredTasks.length} 🎁
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "8px",
    overflowY: "auto",
    maxHeight: "390x",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
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
    gap: "14px",
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
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  hiddenCheckbox: {
    display: "none",
  },
  customCheckbox: {
    width: "18px",
    height: "18px",
    borderRadius: "6px",
    border: "2px solid #555",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },
  checkMark: {
    color: "#fff",
    fontSize: "12px",
    fontWeight: "bold",
  },
};
