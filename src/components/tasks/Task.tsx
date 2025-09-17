/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { completeTask, getTasks } from "@/api/tasks-context";
import { TasksView } from "./components";

declare const chrome: any;
interface TasksProps {
  user: any;
  shadow: any;
}

export function Tasks({ shadow, user }: TasksProps) {
  const [showCongrats, setShowCongrats] = useState(false);
  const [taskItems, setTaskItems] = useState<any[]>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks({ userId: user._id });
      const taskData = tasks.data.map((t: any) => ({
        ...t,
      }));

      setTaskItems(taskData);
    };
    fetchTasks();
  }, []);
  useEffect(() => {
    const onboardingTasks = taskItems.filter((t) => t.type === "onboarding");
    const completedOnboarding = onboardingTasks.filter((t) => t.checked).length;
    if (
      onboardingTasks.length > 0 &&
      completedOnboarding === onboardingTasks.length
    ) {
      chrome.storage.local.get(["popup"], (res: { popup: boolean }) => {
        if (res.popup !== false) {
          setShowCongrats(true);
          chrome.storage.local.set({
            popup: false,
          });
          const timer = setTimeout(() => {
            setShowCongrats(false);
          }, 5000);
          return () => clearTimeout(timer);
        }
      });
    }
  }, [taskItems]);

  const toggleTask = async (_id: string) => {
    try {
      setTaskItems((prev) =>
        prev.map((task) =>
          task._id === _id ? { ...task, checked: !task.checked } : task
        )
      );

      await completeTask(user._id, _id);

      shadow.showToast("Амжилттай бүртгэгдлээ", {
        title: "Task completed!",
        type: "success",
        duration: 2000,
      });
    } catch (error: any) {
      shadow.showToast("Аль хэдийн бүртгэгдсэн task байна", {
        title: "Warning!",
        type: "info",
        duration: 3000,
      });
    }
  };

  const handleClaim = () => {
    const onboardingTasks = taskItems.filter((t) => t.type === "onboarding");
    const completedOnboarding = onboardingTasks.filter((t) => t.checked).length;

    if (
      onboardingTasks.length > 0 &&
      completedOnboarding === onboardingTasks.length
    ) {
      setShowCongrats(false);
      shadow.showToast("Open Your Settings!", {
        title: "Avatar claimed!",
        type: "success",
        duration: 3000,
      });
    } else {
      shadow.showToast("Complete all OnBoarding tasks first!", {
        title: "Not yet!",
        type: "warning",
        duration: 3000,
      });
    }
  };

  return (
    <TasksView
      taskItems={taskItems}
      showCongrats={showCongrats}
      onToggle={toggleTask}
      onClaim={handleClaim}
      onCloseCongrats={() => setShowCongrats(false)}
    />
  );
}
