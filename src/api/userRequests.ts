import axios from "axios";
import { IUser } from "../provider/userProvider";

export const getUser = async (user: IUser) => {
  try {
    const response = await axios.put(
      `http://localhost:4000/users/update/${user.id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
