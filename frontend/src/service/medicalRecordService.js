import api from "./api";

export const getAllRecords = () => api.get("/medical-records");

export const getRecordById = (id) => api.get(`/medical-records/${id}`);

export const saveRecord = (record) => api.post("/medical-records", record);

export const updateRecord = (id, record) =>
  api.put(`/medical-records/${id}`, record);

export const deleteRecord = (id) => api.delete(`/medical-records/${id}`);