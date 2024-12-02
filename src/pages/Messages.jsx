import {
  Link,
  useLoaderData,
  Form,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import api from "../data/api";
import { toast } from "react-hot-toast";
import Button from "../components/Button";

export async function loader({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");

  try {
    const response = await api.get(`/api/messages?page=${page}`);

    console.log(response.data);

    return {
      messages: response.data.messages,
      pagination: response.data.pagination,
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

// Action function for message deletion
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

// Button component
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
  const { messages: loaderMessages, pagination } = useLoaderData();
  const actionData = useActionData();
  const [page, setPage] = useState(pagination?.page || 1);

  const navigate = useNavigate();

  useEffect(() => {
    navigate("?page=" + page);
  }, [page]);

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
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="p-2 w-20 bg-purple-700 rounded-xl bg-gradient-to-r hover:bg-gradient-to-l transition-transform duration-1000 from-[rgb(212,39,160)] from-15% via-[#7a4cc4]  to-[#00dbde] disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {pagination?.page || 1} of {pagination?.totalPages}
            </span>
            <button
              onClick={() =>
                setPage((prev) =>
                  pagination?.page < pagination.totalPages ? prev + 1 : prev
                )
              }
              disabled={pagination?.page >= pagination?.totalPages}
              className="p-2 w-20 bg-purple-700 rounded-xl disabled:opacity-50 bg-gradient-to-r hover:bg-gradient-to-l transition-transform duration-1000 from-[rgb(212,39,160)] from-15% via-[#7a4cc4]  to-[#00dbde]"
            >
              Next
            </button>
          </div>
        </div>
        <Link to="/dashboard">
          <button className="p-2 w-20 bg-purple-700 rounded-xl disabled:opacity-50 bg-gradient-to-r hover:bg-gradient-to-l transition-transform duration-1000 from-[rgb(212,39,160)] from-15% via-[#7a4cc4]  to-[#00dbde] ">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Messages;
