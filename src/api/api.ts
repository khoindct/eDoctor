import axios from "axios";

const api = () => {
  return axios.create({
    baseURL: "/",
    headers: "",
  });
};

export default api;
