import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthRoute = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace={true} />;
  }
  return <Outlet />;
};

export default AuthRoute;
