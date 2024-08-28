// src/services/auth.service.js

import axios from "axios";

class AuthService {
  constructor() {
    // Create a new instance of axios with a custom configuration
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || "http://localhost:3000",
      // We set our API's base URL so that all requests use the same base URL
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  login = async (requestBody) => {
    return await this.api.post("/auth/login", requestBody);
    // same as
    // return axios.post("http://localhost:3000/auth/login");
  };

  signup = async (requestBody) => {
    return await this.api.post("/auth/signup", requestBody);
    // same as
    // return axios.post("http://localhost:3000/auth/singup");
  };

  verify = async () => {
    return await this.api.get("/auth/verify");
    // same as
    // return axios.post("http://localhost:3000/auth/verify");
  };
}

// Create one instance object
const authService = new AuthService();

export default authService;
