import api from "./api";

export const registerUser = (data) => {
  // data = { name, email, password }
  return api.post("/auth/register", data);
};

export const loginUser = (data) => {
  // data = { email, password }
  return api.post("/auth/login", data);
};