import axios from "axios";
const urlString = "https://wantedtosay-server.adaptable.app/api";

export const getMessages = async () => {
  try {
    const response = await axios.get(`${urlString}/messages`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCommentsPost = async (postId) => {
  try {
    const response = await axios.get(`${urlString}/comments/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postComment = async (postId, userId, content) => {
  try {
    const format = {
      content,
      postId,
      userPosted: userId,
      reactions: [],
    };
    const response = await axios.post(`${urlString}/comments`, format);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMessageById = async (id) => {
  try {
    const response = await axios.get(`${urlString}/messages/${id}`);
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

export const postMessage = async (content, encryptionKey, recipient, color) => {
  const formattedData = {
    receiver: recipient,
    content: content,
    secretKey: encryptionKey,
    color,
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
    const response = await axios.get(
      `$https://wantedtosay-server.adaptable.app/auth/users/${userId}`
    );
    return response.data.uniqueKey;
  } catch (error) {
    console.error(error);
  }
};

export const decryptMessages = async (data, secretKey) => {
  try {
    const response = await axios.post(`${urlString}/messages/decrypt`, {
      secretKey: secretKey,
      data: data,
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

export const pushReaction = async (commentId, userId) => {
  try {
    const response = await axios.put(
      `${urlString}/comments/${commentId}/reactions`,
      { userId, action: "push" }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const removeReaction = async (commentId, userId) => {
  try {
    const response = await axios.put(
      `${urlString}/comments/${commentId}/reactions`,
      { userId, action: "pull" }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCommentContent = async (commentId, content) => {
  try {
    const response = await axios.put(`${urlString}/comments/${commentId}`, {
      content,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(`${urlString}/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCode = async (email) => {
  if (!email) return;
  try {
    const response = await axios.post(`http://localhost:3000/auth/get-code`, {
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendCode = async (email) => {
  if (!email) return;
  try {
    const response = await axios.post(`http://localhost:3000/auth/create-code`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserFromEmail = async (email) => {
  if (!email) return;
  try {
    const response = await axios.post(
      `http://localhost:3000/api/users/email/findOne`,
      { email: email }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updatePassword = async (email, newPass, code) => {
  if (!email || !newPass || !code) return;
  try {
    const response = await axios.put("http://localhost:3000/auth/update-pass", {
      email,
      newPass,
      code,
    });
    return response.data;
  } catch (error) {}
};
