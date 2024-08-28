import axios from "axios";
const urlString = "http://localhost:3000/api";

export const updateUser = async (id, data) => {
  try {
    if (!data.name || !data.email) return;
    const response = await axios.put(`${urlString}/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
