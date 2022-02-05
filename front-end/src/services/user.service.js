import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3050/user";

const getUsers = () => {
  return axios.get(API_URL + "/users", { headers: authHeader() });
};

const userService = {
  getUsers,
};

export default userService;
