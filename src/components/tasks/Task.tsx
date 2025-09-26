import React, { useEffect, useState, useMemo } from "react";
import { useUser } from "@/provider/userProvider";
import MiniDateCalendar from "./components/MiniDateCalendar";

export function Tasks({
  user,
  setNotification,
  shadow,
}: {
  user: any;
  setNotification: any;
  shadow: any;
}) {
  const { createTask } = useUser();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [completed, setCompleted] = useState<{ [key: string]: boolean }>({});

  const handleAddTask = async () => {
    if (!selectedDate || !time || !title.trim()) {
      shadow.showToast("Мэдээлэлээ бүтэн оруулна уу", {
        title: "",
        type: "error",
      });
      return;
    }

    const [hours, minutes] = time.split(":").map(Number);
    const datetime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      hours,
      minutes
    );

    const success = await createTask(title, datetime.toISOString());
    if (success) {
      setTitle("");
      setTime("");
      shadow.showToast("Амжилттай үүслээ!", {
        title: "Success",
        type: "success",
      });
    }
  };

  // Notification system
  useEffect(() => {
    const interval = setInterval(() => {
      if (!user?.tasks) return;
      const now = new Date();

      const dueTask = user.tasks.find((task: any) => {
        const taskTime = new Date(task.datetime);
        const diff = taskTime.getTime() - now.getTime();
        return diff < 60 * 1000 && diff > 0;
      });

      if (dueTask) {
        setNotification(dueTask);

        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, [user?.tasks]);

  // Filter tasks by date
  const filteredTasks = useMemo(() => {
    if (!selectedDate) return user?.tasks ?? [];

    return (user?.tasks ?? []).filter((task: any) => {
      const taskDate = new Date(task.datetime);
      return (
        taskDate.getFullYear() === selectedDate.getFullYear() &&
        taskDate.getMonth() === selectedDate.getMonth() &&
        taskDate.getDate() === selectedDate.getDate()
      );
    });
  }, [user?.tasks, selectedDate]);

  return (
    <div
      style={{
        display: "flex",
        gap: "40px",
        padding: "20px 40px 40px 40px",
        color: "#000",
      }}
    >
      <MiniDateCalendar value={selectedDate} onChange={setSelectedDate} />

      <div style={{ flex: 1 }}>
        <h3>Хийх зүйлс:</h3>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {filteredTasks.map((task: any) => {
            const isDone = completed[task._id];
            return (
              <div
                key={task._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #f0f0f0",
                  padding: "6px 0",
                  gap: "12px",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isDone || false}
                    onChange={() =>
                      setCompleted((prev) => ({
                        ...prev,
                        [task._id]: !isDone,
                      }))
                    }
                    style={{
                      appearance: "none",
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      border: "1px solid #f6f6f6",
                      cursor: "pointer",
                      display: "inline-block",
                      boxShadow: "-1px 2px 2px 0px #00000040 inset",
                      position: "relative",
                      backgroundColor: isDone ? "#0BA42C" : "transparent",
                    }}
                  />

                  <span
                    style={{
                      textDecoration: isDone ? "line-through" : "none",
                      color: isDone ? "#888" : "#000",
                      fontSize: "14px",
                      flex: 1,
                    }}
                  >
                    {task.title}
                  </span>
                </label>
                <span
                  style={{
                    color: isDone ? "#aaa" : "#666",
                    fontSize: "12px",
                    textDecoration: isDone ? "line-through" : "none",
                  }}
                >
                  {new Date(task.datetime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            );
          })}
          {filteredTasks.length === 0 && (
            <div style={{ color: "#888", fontSize: "14px" }}>
              Энэ өдөр хийх зүйл алга.
            </div>
          )}
        </div>

        {/* Add task input */}
        {/* Add task input */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            border: "1px solid #ddd",
            borderRadius: "40px",
            padding: "8px 16px",
            marginTop: "20px",
            cursor: "text",
          }}
          onClick={() => setExpanded(true)}
        >
          <button
            onClick={handleAddTask}
            style={{
              marginRight: "8px",
              color: "#666",
              backgroundColor: "transparent",
              border: 0,
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ＋
          </button>
          <input
            type="text"
            placeholder="Шинэ даалгавар үүсгэх"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "14px",
              background: "transparent",
            }}
          />
          {expanded && (
            <input
              type="time"
              placeholder="цаг : мин"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{
                border: "1px solid #ddd",
                borderRadius: "40px",
                padding: "4px 12px",
                fontSize: "14px",
                outline: "none",
                animation: "fadeIn 0.3s ease forwards",
              }}
            />
          )}
        </div>

        <style>
          {`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `}
        </style>
      </div>
    </div>
  );
}
