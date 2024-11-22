import { FaLongArrowAltLeft } from "react-icons/fa";
import logoIcon from "../assets/image/logo-icon.png";
import Button from "../components/Button";
import { Form, Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import api from "../data/api";
import Input from "../components/Input";
import { useState } from "react";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to change your password.");
      return;
    }
    if (newPassword.trim().length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    try {
      await api.post("/api/auth/change_password", { newPassword });
      toast.success("Password changed successfully!");
      navigate("/dashboard/settings");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen text-white bg-gradient-to-r from-[rgb(167,49,167)] from-25% to-[#7a4cc4]">
      <div className="bg-[#250933] flex flex-col justify-center items-center gap-8 p-10 rounded-2xl w-[90%] sm:max-w-2xl">
        <div>
          <img src={logoIcon} alt="Logo" />
        </div>
        <h1 className="text-4xl">Change Password</h1>
        <form
          onSubmit={handleChangePassword}
          className="w-full px-20 flex flex-col gap-4"
        >
          <label htmlFor="newpassword" className="text-lg">
            New Password:
          </label>
          <Input
            type="password"
            id="newpassword"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Button className="" type="submit">
            <div className="flex w-full text-sm justify-center gap-3 items-center">
              Change Password
            </div>
          </Button>
        </form>
        <Link to="/auth/settings">
          <Button className="my-2">
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
