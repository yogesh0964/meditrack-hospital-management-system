import api from "./api";

export const getDashboardData = () => api.get("/dashboard");

export const getReportData = () => api.get("/reports/dashboard");