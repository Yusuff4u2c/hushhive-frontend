import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import logoIcon from "../assets/image/logo-icon.png";
import Button from "../components/button";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticationService } from "../libs/services/AuthenticationService";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleChangePassword = async () => {
    try {
      AuthenticationService.sendPasswordResetEmail(user.email);
      toast.success("password reset email sent!");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center text-white bg-gradient-to-r from-[rgb(167,49,167)] from-25% to-[#7a4cc4]">
      <div className="bg-[#250933] flex flex-col justify-center items-center gap-8 p-10 my-4 rounded-2xl w-[90%] sm:max-w-2xl">
        <div>
          <img src={logoIcon} alt="" />
        </div>
        <h1 className="text-4xl">Change Password</h1>
        <p className="text-sm ">
          Click the button below to get email to change your password.
        </p>

        <Button className={"w-full sm:w-[60%]"} onClick={handleChangePassword}>
          <div className="flex text-sm justify-center gap-3 items-center">
            Change Password
          </div>
        </Button>

        <Link to="/settings">
          <Button className="my-3">
            <div className="flex w-full justify-center gap-3 items-center">
              <FaLongArrowAltLeft /> Go Back
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ChangePassword;
