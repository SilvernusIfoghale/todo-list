import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const client = axios.create({
  baseURL: BASE_URL,
});

export default client;
