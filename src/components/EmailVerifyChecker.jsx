import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const EmailVerifyCheck = () => {
  const { user } = useAuth();
  const location = useLocation(); // "/messages"

  if (!user.emailVerified) {
    return (
      <Navigate
        to="/verify-email"
        replace={true}
        state={{ referrer: location }}
      />
    );
  }

  return <Outlet />;
};

export default EmailVerifyCheck;
