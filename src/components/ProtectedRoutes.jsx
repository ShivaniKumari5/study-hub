import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import AuthServices from "../services/AuthServices";

function ProtectedRoutes({ role }) {
  const isLogin = AuthServices.getIsLogin();
  const userType = AuthServices.getUserType();

  // Not logged in at all
  if (!isLogin) {
    toast.error("Please login first");
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role
  // userType: "1" = admin, "2" = normal user (based on your Login logic)
  if (role === "admin" && userType !== "1") {
    toast.error("Access denied");
    return <Navigate to="/" replace />;
  }

  // All good — render the nested routes
  return <Outlet />;
}

export default ProtectedRoutes;