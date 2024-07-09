import axios from "axios";
import Cookies from "js-cookie";

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

export function loggedIn() {
  const response = axios.get(`${BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
  return response;
}
