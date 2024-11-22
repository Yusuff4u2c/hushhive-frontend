import api from "./api";

export default async function getMessages() {
  try {
    const response = await api.get("/api/messages");
    const messages = response?.data?.messages || [];
    return messages;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    throw new Error(
      `Error fetching messages: ${
        error.response?.data?.message || error.message
      }`
    );
  }
}
