import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3050/user";

const getUsers = (/*userId*/) => {
  return axios.get(API_URL + "/users", { /*userId,*/ headers: authHeader() });
};
// eslint-disable-next-line
const findUsers = (searchUser) => {
  return axios.post(API_URL + "/users/find", { searchUser });
};

const createUser = (email, password) => {
  return axios.post(API_URL + "/register", { email, password });
};

const deleteUser = (userId) => {
  return axios.delete(API_URL + "/users/" + userId);
};

const updateUser = (userId, role) => {
  return axios.put(API_URL + "/users/" + userId, { role });
};

const userService = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
  findUsers,
};

export default userService;
