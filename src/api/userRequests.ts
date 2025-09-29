import axios from "axios";
import { IUser } from "../provider/userProvider";

export const getUser = async (user: IUser) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/update/${user._id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
