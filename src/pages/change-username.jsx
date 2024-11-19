import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import logoIcon from "../assets/image/logo-icon.png";
import Button from "../components/button";
import { Link, useNavigate } from "react-router-dom";
const Changeusername = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center text-white bg-gradient-to-r from-[rgb(167,49,167)] from-25% to-[#7a4cc4]">
      <div className="bg-[#250933] flex flex-col justify-center items-center gap-8 p-10 my-4 rounded-2xl">
        <div>
          <img src={logoIcon} alt="" />
        </div>
        <h1 className="text-4xl">Change Username</h1>
        <p className="text-sm">You can change your username from here.</p>
        <form action="" className="border-b-2 border-[rgb(142,28,177)] pb-6">
          <div>
            <label htmlFor="user-name">New Username</label> <br />
            <input
              type="text"
              id="user-name"
              name="user-name"
              placeholder="Enter new username here"
              className="outline-none bg-transparent w-[400px] pb-5 my-5 border-b-2"
            />{" "}
          </div>

          <div>
            <label htmlFor="psw">Current Password</label> <br />
            <input
              type="password"
              id="psw"
              name="psw"
              placeholder="Enter your password here"
              className="outline-none bg-transparent w-[400px] pb-5 my-5 border-b-2"
            />
          </div>
          <Button>
            <div className="flex  justify-center gap-3 items-center">
              Change Username <FaLongArrowAltRight />
            </div>
          </Button>
        </form>
        <Link to="/settings">
          <Button className=" my-3">
            <div className="flex w-full justify-center gap-3 items-center">
              <FaLongArrowAltLeft /> Go Back
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Changeusername;
