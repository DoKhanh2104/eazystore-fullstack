import { useAuth } from "@/store/auth-context";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/login") {
      sessionStorage.setItem("redirectPath", location.pathname);
    }
  }, [isAuthenticated, location.pathname]);

  return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
