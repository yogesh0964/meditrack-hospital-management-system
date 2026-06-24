import api from "./api";

export const getAllPatients = () => api.get("/admin/patients");

export const getPatientById = (id) => api.get(`/admin/patients/${id}`);

export const savePatient = (patient) => api.post("/admin/patients", patient);

export const updatePatient = (id, patient) =>
  api.put(`/admin/patients/${id}`, patient);

export const deletePatient = (id) => api.delete(`/admin/patients/${id}`);