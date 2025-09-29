import axios from "axios";

export async function getNotifs() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/notif/all`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to fetch tasks:",
      error?.response?.data || error.message
    );
    throw error;
  }
}
