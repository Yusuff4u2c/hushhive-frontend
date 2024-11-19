import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthRoute = () => {
  const { user } = useAuth();

  return user ? <Navigate to="/auth/home" replace /> : <Outlet />;
};

export default AuthRoute;
