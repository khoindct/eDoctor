import axios from "axios";

const api = () => {
  return axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: "",
  });
};

export default api;
