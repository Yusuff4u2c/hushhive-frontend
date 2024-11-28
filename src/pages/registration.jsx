import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import logoIcon from "../assets/image/logo-icon.png";
import Button from "../components/Button";
import Input from "../components/Input";
import * as Yup from "yup";
import api from "../data/api";
import { useEffect } from "react";

const regSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

export async function action({ request }) {
  const formData = new URLSearchParams(await request.text());
  const data = Object.fromEntries(formData.entries());

  try {
    await regSchema.validate(data, { abortEarly: false });

    const response = await api.post("/api/auth/register", data);

    if (!response.data.success) {
      throw new Error(response.data.message || "Registration failed");
    }

    return { success: true };
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
}

const YourTurn = () => {
  return (
    <div className="bg-[#c1bca9] text-center px-8 py-3 rounded-lg">
      <h1 className="text-xl pb-3 border-b text-[#61562a]">How to Play?</h1>
      <div className="text-green-700 pt-3">
        <p>
          ► <span className="font-bold">Register your Account</span> NOW!!
          👇👇👇
        </p>
        <p>
          ► Share your <span className="font-bold">Dare Link</span> with others
        </p>
        <p>
          ► Receive{" "}
          <span className="font-bold">
            anonymous compliments and secret messages
          </span>{" "}
          from your friends.
        </p>
      </div>
      <p className="text-green-600">
        Now it's your turn to create an account and dare your friends to tell
        you what they think about you!
      </p>
    </div>
  );
};

const Registration = () => {
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const loading = navigation.state === "submitting";
  const actionData = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!actionData) return;
    if (actionData?.success) {
      toast.success("Registration successful! Redirecting...");
      navigate("/auth/login");
    } else if (actionData?.errors) {
      if (actionData.errors.general) {
        toast.error(actionData.errors.general);
      } else {
        Object.values(actionData.errors).forEach((error) => {
          toast.error(error);
        });
      }
    }
  }, [actionData]);

  return (
    <div className="flex justify-center items-center text-white bg-gradient-to-r from-[rgb(167,49,167)] from-25% to-[#7a4cc4]">
      <div className="bg-[#250933] flex flex-col justify-center items-center gap-8 p-10 my-4 rounded-2xl">
        <div>
          <img src={logoIcon} alt="logo-icon" />
        </div>

        <h1 className="text-4xl">Register</h1>
        {searchParams.get("referrer") === "message-form" && <YourTurn />}

        <Form method="post" noValidate>
          <div className="mb-5">
            <label htmlFor="username" className="block mb-2">
              Your Username
            </label>
            <Input
              type="text"
              id="username"
              placeholder="Enter your username"
              name="username"
              error={actionData?.errors?.username}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-2">
              Your Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              error={actionData?.errors?.email}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
              error={actionData?.errors?.password}
            />
          </div>

          <Button
            type="submit"
            className={`${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register Account"}
          </Button>
        </Form>

        <a className="text-gray-500" href="#">
          Already Have an Account? Log in
        </a>
        <p className="text-sm">
          By using this service, you agree to our Privacy Policy, Terms of
          Service, and any related policies. <br />
          <Link to="/disclaimer">(Check Disclaimer)</Link>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default Registration;
