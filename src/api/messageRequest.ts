import axios from "axios";
import { IUser } from "../provider/userProvider";
declare const chrome: any;

export const sendMessageReq = async (message: string, user: IUser) => {
  try {
    const token = await chrome.storage.local.get(["sessionToken"]);
    console.log(token.sessionToken);

    const response = await axios.post(
      `${process.env.API_BASE_URL}/api/chat`,
      {
        content: message,
        user,
      },
      {
        headers: {
          Authorization: token.sessionToken,
        },
      }
    );
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const addQuestion = async (question: string) => {
  try {
    const response = await axios.post(
      `${process.env.API_BASE_URL}/message/unanswered`,
      { question }
    );
    return response.data.id;
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = async (id: string) => {
  try {
    await axios.delete(`${process.env.API_BASE_URL}/message/from-mongo/${id}`);
  } catch (error) {
    console.log(error);
  }
};
