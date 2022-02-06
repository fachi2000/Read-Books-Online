import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3050/ticket";

const getTickets = (/*userId*/) => {
  return axios.get(API_URL + "/tickets", { /*userId,*/ headers: authHeader() });
};

const createTicket = (name, userId) => {
  return axios.post(API_URL + "/create", { name, userId });
};

const deleteTicket = (ticketId) => {
  return axios.delete(API_URL + "/tickets/" + ticketId);
};

const updateTicket = (ticketId) => {
  return axios.put(API_URL + "/tickets", { ticketId });
};

const ticketService = {
  getTickets,
  createTicket,
  deleteTicket,
  updateTicket,
};

export default ticketService;
