import {
  FaHome,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa";
import logoIcon from "../assets/image/logo-icon.png";
import Button from "../../components/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { AuthenticationService } from "../libs/services/AuthenticationService";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const { user, signUserIntoApp } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);

  const handleResendVerificationEmail = async () => {
    try {
      setLoading(true);
      await AuthenticationService.sendVerificationEmail();

      toast.success("Verification email sent to your email address.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkIfUserIsVerified = async () => {
    const user = AuthenticationService.getUser();
    if (user.emailVerified) {
      signUserIntoApp(user);
      navigate(state?.referrer ?? "/home");
    }
  };

  useEffect(() => {
    const timeout = setTimeout(checkIfUserIsVerified, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="flex justify-center items-center text-white bg-gradient-to-r from-[rgb(167,49,167)] from-25% to-[#7a4cc4]">
      <div className="bg-[#250933] flex flex-col justify-center items-center gap-8 p-10 my-4 rounded-2xl text-center">
        <div>
          <img src={logoIcon} alt="" />
        </div>
        <h1 className="text-4xl">Email Verification</h1>
        <p className="text-sm max-w-prose">
          You're almost there! We sent an email verification to{" "}
          <span className="underline">{user.email}</span>.
        </p>

        <p className="text-sm max-w-prose">
          Just click on the link in that email to get verified. If you don't see
          it, you may need to check your spam folder.
        </p>

        <p className="text-sm max-w-prose">Still can't find the email?</p>

        <Button disabled={loading} onClick={handleResendVerificationEmail}>
          <div className="flex justify-center gap-3 items-center">
            Resend Email
          </div>
        </Button>

        <Link to="/">
          <Button>
            <div className="flex w-full justify-center gap-3 items-center">
              <FaLongArrowAltLeft /> Go Home
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
