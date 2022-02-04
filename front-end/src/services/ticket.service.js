import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3050/ticket/";

const getTickets = () => {
  return axios.get(API_URL + "/tickets", { headers: authHeader() });
};

const ticketService = {
  getTickets,
};

export default ticketService;
