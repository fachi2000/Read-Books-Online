import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3050/ticket";

const getTickets = () => {
  return axios.get(API_URL + "/tickets", { headers: authHeader() });
};
// eslint-disable-next-line
const findTickets = (name) => {
  return axios.get(API_URL + "/tickets", { /*name,*/ headers: authHeader() });
};

const createTicket = (name, userId) => {
  return axios.post(API_URL + "/create", { name, userId });
};

const deleteTicket = (ticketId) => {
  return axios.delete(API_URL + "/tickets/" + ticketId);
};

const updateTicket = (ticketId, name) => {
  return axios.put(API_URL + "/tickets/" + ticketId, { name });
};

const validateTicket = (ticketId, userId) => {
  return axios.put(API_URL + "/tickets/validate/" + ticketId, { userId });
};
//used to put moreInfo as true
const returnTicket = (ticketId) => {
  return axios.put(API_URL + "/tickets/return/" + ticketId);
};

//used to put moreInfo as true
const setTicketPrice = (ticketId, price, threshold) => {
  return axios.put(API_URL + "/tickets/setPrice/" + ticketId, {
    price,
    threshold,
  });
};

const ticketService = {
  getTickets,
  createTicket,
  deleteTicket,
  updateTicket,
  validateTicket,
  returnTicket,
  setTicketPrice,
};

export default ticketService;
