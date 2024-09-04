import axios from "axios";

const API_URL = "https://wantedtosay-server.adaptable.app/api/messages";

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
