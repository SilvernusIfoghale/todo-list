import axios from "axios";

const BASE_URL = "https://todo-api-endpoint.onrender.com";

const client = axios.create({
  baseURL: BASE_URL,
});

export default client;
