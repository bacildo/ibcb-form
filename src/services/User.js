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

export function changePassword(token, oldPassword, newPassword) {
  return axios.post(`${BASE_URL}/change-password`, { oldPassword, newPassword }, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// (Opcional) forgot/reset – estão prontos, se quiser usar depois
export function forgotPassword(email) {
  return axios.post(`${BASE_URL}/forgot`, { email });
}

export function resetPassword(tokenReset, newPassword) {
  return axios.post(`${BASE_URL}/reset`, { token: tokenReset, newPassword });
}