import logoIcon from "../assets/image/logo-icon.png";
import Button from "../components/Button";
import {
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  Form,
} from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import toast from "react-hot-toast";
import { useEffect } from "react";
import * as Yup from "yup";
import Input from "../components/Input";
import api from "../data/api";
import useAuth from "../hooks/useAuth";

const logInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(5, "password must be at least 5 characters")
    .required("password is required"),
});

export const loginAction = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const data = Object.fromEntries(formData.entries());

  try {
    await logInSchema.validate(data, { abortEarly: false });

    const response = await api.post("/api/auth/login", data);

    return {
      success: true,
      token: response.data.accessToken,
      user: response.data.user,
    };
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const validationErrors = error.inner.reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
      }, {});
      return { success: false, errors: validationErrors };
    }

    if (error.response && error.response.data) {
      return {
        success: false,
        errors: {
          general: error.response.data.message || "An error occurred.",
        },
      };
    }
    return {
      success: false,
      errors: {
        general: error.message || "An unexpected error occurred.",
      },
    };
  }
};

const Login = () => {
  const navigate = useNavigate();
  const { signUserIntoApp } = useAuth();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  useEffect(() => {
    if (!actionData) return;
    if (actionData?.success) {
      toast.success("Logged in Successfully");
      localStorage.setItem("accessToken", actionData.token);
      signUserIntoApp(actionData.user);
      navigate("/dashboard");
    } else if (actionData?.errors.general) {
      toast.error(actionData.errors.general);
    } else {
      Object.values(actionData.errors).forEach((error) => {
        toast.error(error);
      });
    }
  }, [actionData]);

  return (
    <div>
      <div className="flex justify-center items-center text-white bg-gradient-to-r from-[rgb(167,49,167)] from-25% to-[#7a4cc4]">
        <div className="bg-[#250933] flex flex-col justify-center items-center gap-8 p-10 my-4 rounded-2xl">
          <div>
            <img src={logoIcon} alt="" />
          </div>
          <h1 className="text-4xl">Login</h1>
          <p className="text-sm">
            Recieve anonymous compliments from your friends <br /> and send
            anonymous messages to your friends for free.
          </p>
          <Form method="post">
            <div className="mb-5">
              <label htmlFor="user-name">Your Email</label> <br />
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="outline-none bg-transparent w-[400px] pb-5 my-5 border-b-2"
                name="email"
                error={actionData?.errors?.email}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="psw">Password</label> <br />
              <Input
                type="password"
                id="psw"
                suggested="password"
                placeholder="Enter your password"
                className="outline-none bg-transparent w-[400px] pb-5 my-5 border-b-2"
                name="password"
                error={actionData?.errors?.password}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              <div className="flex justify-center gap-3 items-center">
                {isLoading ? "Logging in..." : "Log in"} <FaLongArrowAltRight />
              </div>
            </Button>
          </Form>
          <Link to="/dashboard/forgotpassword" className="text-gray-500">
            Forgot Password
          </Link>
          <Link to="/auth/register" className="text-gray-500 my-0">
            Don't Have an Account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
