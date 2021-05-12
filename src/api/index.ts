import axios from "axios";

const api = (headerConfig: any = null) => {
  return axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: headerConfig ?? "",
    withCredentials: true,
  });
};

export default api;
