import axios from "axios";

const API_BASE = "http://localhost:4000";

export interface FeedbackPayload {
  userId: string;
  question: string;
  categoryId: string[];
  unknown: boolean;
}

export async function getFeedbackCategories() {
  const res = await axios.get(`${API_BASE}/feedback/categories`);
  if (res.data && Array.isArray(res.data.data)) {
    return res.data.data;
  }
  return [];
}

export async function createFeedback(payload: FeedbackPayload) {
  const res = await fetch(`${API_BASE}/feedback/add-new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }
  return data;
}

export async function getFeedbackByUserId(userId: string) {
  const res = await axios.get(`${API_BASE}/feedback/user/${userId}`);
  return Array.isArray(res.data.data) ? res.data.data : res.data;
}

export async function deleteFeedback(feedbackId: string) {
  try {
    const res = await axios.delete(`${API_BASE}/feedback`, {
      data: { id: feedbackId },
    });

    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to delete feedback");
    }

    return res.data;
  } catch (err: any) {
    throw new Error(err.message || "Network error");
  }
}
