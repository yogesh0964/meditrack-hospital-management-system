import api from "./api";

export const getAllAppointments = () => api.get("/appointments");

export const getAppointmentById = (id) => api.get(`/appointments/${id}`);

export const bookAppointment = (appointment) =>
  api.post("/appointments", appointment);

export const updateAppointment = (id, appointment) =>
  api.put(`/appointments/${id}`, appointment);

export const cancelAppointment = (id) => api.delete(`/appointments/${id}`);