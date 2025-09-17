import axios from "axios";
import { IUser } from "../provider/userProvider";
declare const chrome: any;

export const sendMessageReq = async (message: string, user: IUser) => {
  try {
    const token = await chrome.storage.local.get(["sessionToken"]);
    console.log(token.sessionToken);

    const response = await axios.post(
      `http://localhost:4000/api/chat`,
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
      `http://localhost:4000/message/unanswered`,
      { question }
    );
    return response.data.id;
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = async (id: string) => {
  try {
    await axios.delete(`http://localhost:4000/message/from-mongo/${id}`);
  } catch (error) {
    console.log(error);
  }
};
