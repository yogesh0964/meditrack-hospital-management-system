import api from "./api";

export const getAllDoctors = () => api.get("/admin/doctors");

export const getDoctorById = (id) => api.get(`/admin/doctors/${id}`);

export const saveDoctor = (doctor) => api.post("/admin/doctors", doctor);

export const updateDoctor = (id, doctor) =>
  api.put(`/admin/doctors/${id}`, doctor);

export const deleteDoctor = (id) => api.delete(`/admin/doctors/${id}`);

export const searchDoctor = (name) =>
  api.get(`/admin/doctors/search`, { params: { name } });