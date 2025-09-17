// office-context.ts
import axios from "axios";

const API_URL = "http://localhost:4000/users";

export const getAllUsers = async () => {
  const res = await axios.get(`${API_URL}/list`);
  console.log(res.data, "office-contexteessss");
  return res.data;
};

export const updateUser = async (id: string, data: any) => {
  const res = await axios.put(`${API_URL}/update/${id}`, data);
  return res.data;
};
