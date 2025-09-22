import React, { useEffect, useState } from "react";
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

  const handleAddTask = async () => {
    if (!selectedDate || !time || !title.trim()) {
      alert("Бүх талбарыг бөглөнө үү!");
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
    }
  };

  // ⏰ Notification system
  useEffect(() => {
    const interval = setInterval(() => {
      if (!user?.tasks) return;
      const now = new Date();

      const dueTask = user.tasks.find((task: any) => {
        const taskTime = new Date(task.datetime);
        const diff = taskTime.getTime() - now.getTime();
        console.log(task.title, diff, "taskss");
        return diff < 60 * 1000;
      });

      if (dueTask) {
        setNotification(dueTask);

        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
      console.log(dueTask, "tasks");
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, [user?.tasks]);

  return (
    <div
      style={{ display: "flex", gap: "40px", padding: "20px", color: "#000" }}
    >
      <MiniDateCalendar value={selectedDate} onChange={setSelectedDate} />

      <div style={{ flex: 1 }}>
        <h3>Хийх зүйлс:</h3>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <input
            type="text"
            placeholder="Жишээ: Багийн уулзалт төлөвлөх"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="tsag min"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <button onClick={handleAddTask}>+</button>
        </div>

        <ul style={{ marginTop: "20px" }}>
          {user?.tasks?.map((task: any) => (
            <li key={task._id}>
              {task.title}{" "}
              <span style={{ color: "#666", fontSize: "12px" }}>
                {new Date(task.datetime).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
