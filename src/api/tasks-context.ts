import axios from "axios";

export async function getTasks({ userId }: { userId: string }) {
  try {
    const response = await axios.get(`http://localhost:4000/tasks/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to fetch tasks:",
      error?.response?.data || error.message
    );
    throw error;
  }
}

export async function completeTask(userId: string, taskId: string) {
  try {
    const response = await axios.post(
      "http://localhost:4000/tasks/completeTask",
      { userId, taskId }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to complete task:",
      error?.response?.data || error.message
    );
    throw error;
  }
}
