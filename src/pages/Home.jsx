import { Link } from "react-router-dom";
import Button from "../components/Button";
import {
  FaLongArrowAltRight,
  FaShareAlt,
  FaFacebookSquare,
  FaWhatsapp,
  FaCogs,
  FaClipboard,
  FaTwitter,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useCopyToClipboard from "../hooks/clipboard";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const { user } = useAuth();
  const appUrl = import.meta.env.VITE_APP_URL;
  const [, copy] = useCopyToClipboard();
  const userUrl = `${appUrl}/${user?.username || "GUEST"}`;


  const handleClick = (platform) => {
    const defaultMessage =
      "Write a *secret anonymous message* for me. I *won't know* who wrote it...";
    let url;
    switch (platform) {
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${defaultMessage}%0A${userUrl}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${userUrl}&text=${defaultMessage}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${userUrl}`;
        break;
      default:
        return;
    }
    window.open(url, "_blank");
  };

  return (
    <div>
      <div className="flex justify-center items-center text-white bg-gradient-to-r from-[rgb(167,49,167)] from-25% to-[#7a4cc4]">
        <div className="bg-[#250933] flex flex-col justify-center items-center gap-8 p-4 sm:p-10 my-4 rounded-2xl w-[90%] sm:w-auto sm:max-w-2xl">
          <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="text-2xl sm:text-4xl text-center capitalize">
              {user?.username || "GUEST"}'s <br />
              Profile
            </h1>
            <span className="flex items-center gap-1 text-[12px]">
              <a
                href={`/${user?.username || "GUEST"}`}
                rel="noreferrer"
                target="_blank"
              >
                {appUrl}/{user?.username || "GUEST"}
              </a>
              <FaClipboard
                onClick={() => {
                  if (copy(`${appUrl}/${user?.username || "GUEST"}`)) {
                    toast("URL copied to clipboard");
                  }
                }}
                className="cursor-pointer"
              />
            </span>
            <p className="text-[14px]">
              <span className="font-bold">Share your profile link</span> ❤️ to
              get responses from your <br /> friend. Go to
              <span className="font-bold">"View Messages"</span> to check out
              the <br />
              responses
            </p>
          </div>
          <div className="border-b-2 w-full flex flex-col pb-6 text-center">
            <Link to="/auth/messages">
              <Button className={"w-full"}>
                <div className="flex justify-center gap-3 items-center">
                  View Messages <FaLongArrowAltRight />
                </div>
              </Button>
            </Link>
            <a
              href="#"
              className="bg-[rgb(218,48,90)] flex justify-center items-center gap-4 my-3 p-3 rounded-lg hover:bg-gradient-to-r from-[rgb(212,39,160)] from-10% to-[#7a4cc4]"
            >
              <FaShareAlt className="hover:-translate-x-3" /> Share My Profile
            </a>
            <a
              href="#"
              onClick={() => handleClick("whatsapp")}
              className="bg-[#25d366] flex justify-center items-center gap-4 my-3 p-3 rounded-lg hover:bg-gradient-to-r from-[rgb(212,39,160)] from-10% to-[#7a4cc4]"
            >
              <FaWhatsapp className="hover:-translate-x-3" /> Share on Whatsapp
            </a>
            <a
              href="#"
              onClick={() => handleClick("facebook")}
              className=" bg-[#3b5998] flex justify-center items-center gap-4 my-3 p-3 rounded-lg hover:bg-gradient-to-r from-[rgb(212,39,160)] from-10% to-[#7a4cc4]"
            >
              <FaFacebookSquare className="hover:-translate-x-3" /> Share on
              Facebook
            </a>
            <a
              href="#"
              onClick={() => handleClick("twitter")}
              className=" bg-[#e4405f] flex justify-center items-center gap-4 my-3 p-3 rounded-lg hover:bg-gradient-to-r from-[rgb(212,39,160)] from-10% to-[#7a4cc4]"
            >
              <FaTwitter className="hover:-translate-x-3" /> Share on Twitter
            </a>
          </div>
          <Link to="/auth/settings" className="w-full">
            <Button className={"w-full"}>
              <div className="flex justify-center gap-3 items-center">
                Settings <FaCogs />
              </div>
            </Button>
          </Link>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Home;
