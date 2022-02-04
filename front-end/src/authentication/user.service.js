import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3050/user/users";
class UserService {
  getPublicContent() {
    return axios.get(API_URL);
  }
  getUserTickets() {
    return axios.get(API_URL, { headers: authHeader() });
  }
}
export default new UserService();
