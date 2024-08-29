import axios from "axios";
const urlString = "http://localhost:3000/api";

export const getMessages = async () => {
  try {
    const response = await axios.get(`${urlString}/messages`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getQueryMessage = async (query) => {
  try {
    const response = await axios.get(
      `${urlString}/messages?q=${query.replace(" ", "_")}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postMessage = async (content, encryptionKey, recipient) => {
  const formattedData = {
    receiver: recipient,
    content: content,
    secretKey: encryptionKey,
  };
  try {
    const response = await axios.post(`${urlString}/messages`, formattedData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserKey = async (userId) => {
  try {
    const response = await axios.get(`${urlString}/users/${userId}`);
    return response.data.uniqueKey;
  } catch (error) {
    console.error(error);
  }
};

export const decryptMessages = async (data, secretKey) => {
  try {
    const response = await axios.post(`${urlString}/messages/decrypt`, {
      secretKey: secretKey,
      data: [data],
    });
    return response.data;
  } catch (error) {
    console.error("Error decrypting messages:", error);
  }
};

export const decryptMessage = async (data, secretKey) => {
  try {
    const response = await axios.post(
      `${urlString}/messages/decrypt/${data._id}`,
      {
        secretKey: secretKey,
        data: [...data],
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
