import Button from "../components/Button";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useParams,
} from "react-router-dom";
import api from "../data/api";
import { toast } from "react-hot-toast";
import { useNavigation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const MAX_CHARACTER_COUNT = 545;

export const loader = async ({ params }) => {
  try {
    const response = await api.get(`/api/users/${params.username}`);
    return response.data.user;
  } catch (error) {
    throw new Response(
      JSON.stringify({
        message: error.response?.data?.message || "User not found",
      }),
      { status: error.response?.status || 404 }
    );
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const message = formData.get("message");

  if (!message || message.length < 5) {
    return { error: "Message must be at least 5 characters long." };
  }

  try {
    await api.post("/api/messages/create", {
      username: params.username,
      message,
    });

    return {
      success: true,
      message: "Your response has been sent anonymously.",
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong.",
    };
  }
};

function NonUser({ username }) {
  return (
    <div className="flex flex-col h-screen justify-center items-center text-white bg-gradient-to-r from-[rgb(167,49,167)] from-25% to-[#7a4cc4]">
      <div className="bg-[#250933] flex flex-col justify-center items-center gap-4 p-10 my-4 rounded-2xl">
        <h1 className="text-4xl">Oops..!</h1>
        <p className="max-w-[40ch] text-center">
          There is no one with the username <b>{username}</b>. Try looking for
          any possible typos.
        </p>
        <p className="max-w-[40ch] text-center">
          Or, you can get started by registering with the username{" "}
          <b>{username}</b> right now. Tap on the "Register Now" button!
        </p>
        <Link to="/auth/register">
          <Button type="submit">Register Now</Button>
        </Link>
        <Link to="/">
          <Button type="submit">Go to Homepage</Button>
        </Link>
      </div>
    </div>
  );
}

const MessageForm = () => {
  const { username } = useParams();
  const fetchedUser = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const loading = navigation.state === "submitting";
  const messageRef = useRef("");

  const [toastDisplayed, setToastDisplayed] = useState(false);

  useEffect(() => {
    if (actionData && !toastDisplayed) {
      console.log(actionData);

      if (!actionData.success) toast.error(actionData.message);
      if (actionData.success) {
        toast.success(actionData.message);
        if (messageRef.current) {
          messageRef.current.value = "";
        }
      }

      setToastDisplayed(true);
    }
  }, [actionData, toastDisplayed]);

  useEffect(() => {
    if (!loading) {
      setToastDisplayed(false);
    }
  }, [loading]);

  if (!fetchedUser) {
    return <NonUser username={username} />;
  }

  return (
    <div className="flex justify-center items-center text-white bg-gradient-to-r from-[rgb(167,49,167)] from-25% to-[#7a4cc4] min-h-screen">
      <div className="bg-[#250933] flex flex-col justify-center items-center gap-4 p-10 my-4 rounded-2xl">
        <h1 className="text-4xl">Say Something</h1>
        <Form method="post" className="flex flex-col gap-4">
          <label htmlFor="message" className="text-sm">
            Say Something About <b>{username}</b>{" "}
            <span className="text-[red]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            ref={messageRef}
            placeholder={`Leave a message for ${username} here..`}
            className="outline-none bg-transparent w-full border p-3 rounded-md resize-none"
            rows={5}
          />
          <p className="text-sm">
            Maximum {MAX_CHARACTER_COUNT} characters allowed.
          </p>
          <Button type="submit" disabled={loading}>
            {loading ? "sending message" : "send message"}
          </Button>
        </Form>
        <p className="text-center max-w-[45ch]">
          Leave a message for <b>{username}</b> anonymously using the form
          above. 🥰 Thank You! 😊
        </p>
      </div>
    </div>
  );
};

export default MessageForm;
