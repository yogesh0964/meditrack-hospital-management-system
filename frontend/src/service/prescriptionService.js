import api from "./api";

export const getAllPrescriptions = () => api.get("/prescriptions");

export const getPrescriptionById = (id) => api.get(`/prescriptions/${id}`);

export const savePrescription = (prescription) =>
  api.post("/prescriptions", prescription);

export const updatePrescription = (id, prescription) =>
  api.put(`/prescriptions/${id}`, prescription);

export const deletePrescription = (id) => api.delete(`/prescriptions/${id}`);

export const downloadPrescriptionPdf = (id) =>
  api.get(`/prescriptions/pdf/${id}`, { responseType: "blob" });