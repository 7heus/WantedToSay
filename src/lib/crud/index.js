import axios from "axios";
const urlString = "http://localhost:3000/api";
const authString = "http://localhost:3000/auth";

export const updateUser = async (id, data) => {
  try {
    if (!data.name || !data.email) return;
    const response = await axios.put(`${urlString}/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const verifyEmail = async (id) => {
  try {
    if (!id) return;
    const response = await axios.post(`${authString}/email/verify`, {
      _id: id,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUser = async (id) => {
  try {
    if (!id) return;
    const response = await axios.get(`${urlString}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
