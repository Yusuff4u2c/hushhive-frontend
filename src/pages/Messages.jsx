import { Link, useLoaderData, Form, useActionData } from "react-router-dom";
import {
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaAngleDown,
} from "react-icons/fa";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import api from "../data/api";
import { toast } from "react-hot-toast";

export async function loader() {
  try {
    const response = await api.get("/api/messages");
    return response.data.messages;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export const action = async ({ params }) => {
  try {
    await api.post(`/api/messages/${params.id}`);
    return { success: true, message: "Message deleted successfully" };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};

const Btn = ({ className, title, onClick, ...others }) => (
  <div>
    <button
      {...others}
      type="button"
      onClick={onClick}
      className={`mt-4 w-full ${className} border text-sm border-[hsl(221,93%,40%)] rounded-full p-1 my-0 mx-auto bg-[#180620]`}
    >
      {title}
    </button>
  </div>
);

function Messages() {
  const loaderMessages = useLoaderData();
  const actionData = useActionData();
  const [paragraphVisibility, setParagraphVisibility] = useState(false);

  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        toast.success(actionData.message);
      } else {
        toast.error(actionData.error);
      }
    }
  }, [actionData]);

  return (
    <div className="flex justify-center items-center text-white bg-gradient-to-r from-[rgb(167,49,167)] from-25% to-[#7a4cc4]">
      <div className="bg-[#250933] w-[600px] leading-loose flex flex-col justify-center items-center gap-8 p-10 my-4 rounded-2xl">
        <h1 className="text-4xl">My Answers</h1>
        <p className="text-center">
          👇 Scroll 👇 down to check out the messages you have received
        </p>
        <div className="flex flex-col pb-6 text-center">
          {loaderMessages.length === 0 ? (
            <p>No messages found. Ask your friends to send more!</p>
          ) : (
            loaderMessages.map((message) => (
              <div
                key={message._id}
                className="border text-start my-3 border-[#5fdee2] p-5 rounded-xl"
              >
                <p className="font-bold">Message:</p>
                <div>
                  <p>{message.message}</p>
                  <p>
                    Anonymous -{" "}
                    {dayjs(message.created_at).format("DD MMM YYYY hh:mm A")}
                  </p>
                </div>
                <Btn title="✨ Share Response ✨" />
                <Form method="post">
                  <Btn title="Delete message" />
                </Form>
              </div>
            ))
          )}
          <Button className="w-full mb-3">
            <div className="flex justify-center gap-3 items-center">
              View More Answers <FaLongArrowAltRight />
            </div>
          </Button>
          <Link to="/dashboard">
            <Button className="w-full my-3">
              <div className="flex justify-center gap-3 items-center">
                <FaLongArrowAltLeft /> Go Back
              </div>
            </Button>
          </Link>
          <Btn
            onClick={() => setParagraphVisibility((prev) => !prev)}
            title={
              <div className="flex justify-center gap-3 items-center">
                HushHive Messages <FaAngleDown />
              </div>
            }
          />
          {paragraphVisibility && (
            <p className="text-start mt-6">
              HushHive is an interactive Dare Game, where you can compliment and
              get complimented by your friends...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;
