import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../data/api";
import toast from "react-hot-toast";
import { set } from "react-hook-form";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  api
    .get("/api/auth/verify_email?token=" + token)
    .then((response) => {
      if (response.data.success) {
        toast.success("Email verified successfully");
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      } else if (
        !response.data.success &&
        response.data.message == "Email already verified"
      ) {
        toast.error("Email already verified");
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      } else {
        toast.error("Email verification failed");
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);
      }
    })
    .catch((error) => {
      toast.error(
        error?.response?.data?.message || "Email verification failed"
      );
      setTimeout(() => {
        navigate("/auth/login");
      });
    });

  return null;
}

export default VerifyEmail;
