//In process, not finished yet

const db = require("../models");
const Ticket = db.tickets;

function canViewTicket(user, ticket) {
  return user.role == "admin" || ticket.userId == user.id;
}

function scopedTickets(user, tickets) {
  if (user.role == "admin") return projects;
  return Ticket.filter((ticket) => ticket.userId === user.id);
}

function canDeleteTicket(user, project) {
  return Ticket.userId === user.id;
}

module.exports = {
  canViewProject,
  scopedProjects,
  canDeleteProject,
};
