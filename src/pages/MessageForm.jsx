import Button from "../components/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import api from "../data/api";

const MAX_CHARACTER_COUNT = 545;

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
          Or, you can get started by registering with the username {username}{" "}
          right now. Tap on "Register Now" button!
        </p>

        <Link to={"/auth/register"}>
          <Button type="submit">Register Now</Button>
        </Link>
        <p className="max-w-prose text-center text-[10px]">
          By using this service, you agree to our Privacy Policy, Terms of
          Service and any related policies.
        </p>

        <Link to={"/"}>
          <Button type="submit">Go to Homepage</Button>
        </Link>
      </div>
    </div>
  );
}

const MessageForm = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [fetchedUser, setFetchedUser] = useState(null);
  const navigate = useNavigate();

  const { signUserOutOfApp, user } = useAuth();
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const value = e.target.value;

    if (value.length <= MAX_CHARACTER_COUNT) {
      setMessage(value);
    }
  }

  async function handleMessageSubmission(e) {
    e.preventDefault();
    if (!message) return toast.error("Please say something!");
    if (message.length < 5)
      return toast.error("Your message should be 5 characters or more!");
    if (!fetchedUser) return toast.error("Invalid action");

    try {
      setProcessing(true);
      await api.post("/api/messages/create", { username, message });
      setMessage("");
      navigate("/auth/register?referrer=message-form");
      toast.success("Your response has been saved anonymously");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setProcessing(false);
    }
  }

  async function checkUser() {
    try {
      const response = await api.get(`/api/users/${username}`);
      return response?.data?.user || null;
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await checkUser();
        setFetchedUser(user);
      } catch (error) {
        toast.error("Unable to fetch user");
        setFetchedUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading user details...</div>;
  if (!loading && !fetchedUser) return <NonUser username={username} />;

  return (
    <div className="flex justify-center items-center text-white bg-gradient-to-r from-[rgb(167,49,167)] from-25% to-[#7a4cc4]">
      <div className="bg-[#250933] flex flex-col justify-center items-center gap-4 p-10 my-4 rounded-2xl">
        {fetchedUser && (
          <>
            <h1 className="text-4xl">Say Something</h1>

            <form onSubmit={handleMessageSubmission}>
              <p className="text-sm">
                Say Something About Me <span className="text-[red]">*</span>
              </p>
              <textarea
                type="text"
                id="message"
                placeholder={`Leave a message for ${username} here..`}
                className="outline-none bg-transparent w-[400px] border-none"
                onChange={handleChange}
                value={message}
                rows={5}
              />
              <p className="pb-1 border-b-2">
                <span className="font-bold">
                  {MAX_CHARACTER_COUNT - message.length}
                </span>{" "}
                characters remaining
              </p>
              <Button type="submit" disabled={processing}>
                <div className="flex justify-center gap-3 items-center">
                  Send Message
                </div>
              </Button>
            </form>

            <p className="max-w-[45ch]">
              Say what do you think about {username} or Leave a feedback for
              {username} anonymously using the form above.. 🥰 Thank You!! 😍😊
            </p>

            <p className="max-w-[45ch]">
              Guide to write perfect Anonymous Messages by HushHive: With the
              help of our anonymous message sender named HushHive now, you can
              easily message your heart's desire to your friends, family
              members, and anyone you know who are on HushHive. We care about
              our users and thus we are suggesting what you may choose to tell
              them anonymously.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageForm;
