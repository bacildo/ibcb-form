import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";

function getPayload(token) {
  try { return JSON.parse(atob(token.split(".")[1])); } catch { return null; }
}

export default function PrivateRoute({ children }) {
  const token = Cookies.get("token");
  const location = useLocation();

  if (!token) return <Navigate to="/admin/login" replace state={{ from: location }} />;

  const payload = getPayload(token);
  if (!payload || String(payload.role || "").toLowerCase() !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  // se precisa trocar senha, só pode acessar /admin/first-access
  const mustChange = Boolean(payload.mcp);
  const isFirstAccess = location.pathname === "/admin/first-access";
  if (mustChange && !isFirstAccess) {
    return <Navigate to="/admin/first-access" replace />;
  }

  return children;
}
