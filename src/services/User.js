import axios from "axios";

const BASE_URL = "http://localhost:3000";

export function registerUser(data) {
  delete data.confirmPassword;
  const response = axios.post(`${BASE_URL}/register`, data);
  return response;
}

export function loginUser(data) {
  const response = axios.post(`${BASE_URL}/user-login`, data);
  return response;
}
