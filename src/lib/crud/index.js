import axios from "axios";
const urlString = "https://wantedtosay-server.adaptable.app/api";
const authString = "https://wantedtosay-server.adaptable.app/auth";

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
