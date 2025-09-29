// office-context.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAllUsers = async () => {
  const res = await axios.get(`${API_URL}/list`);
  console.log(res.data, "office-contexteessss");
  return res.data;
};

export const updateUser = async (id: string, data: any) => {
  const res = await axios.put(`${API_URL}/update/${id}`, data);
  return res.data;
};
