import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:3000";

export function sendMessage(body) {
  const response = axios.post(`${BASE_URL}/messages`, body, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
  return response;
}

export async function getAllMessages() {
  const response = await axios.get(`${BASE_URL}/messages`, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
  return response.data;
}
