import api from "./api";

export const getAllDepartments = () => api.get("/admin/departments");

export const getDepartmentById = (id) => api.get(`/admin/departments/${id}`);

export const saveDepartment = (dept) => api.post("/admin/departments", dept);

export const deleteDepartment = (id) => api.delete(`/admin/departments/${id}`);