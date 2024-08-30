import axios from "axios";

const API_URL = "http://localhost:3000/api/messages";

const getMessages = () => {
  return axios.get(API_URL);
};

const sendMessage = (messageData) => {
  return axios.post(API_URL, messageData);
};

export default {
  getMessages,
  sendMessage,
};
