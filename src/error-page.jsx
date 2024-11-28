import { Link, useRouteError } from "react-router-dom";
import logoIcon from "./assets/image/logo-icon.png";
import Button from "./components/Button";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="flex justify-center items-center text-white bg-gradient-to-r from-[rgb(167,49,167)] from-25% to-[#7a4cc4] min-h-screen px-4">
      <div className="bg-[#250933] flex flex-col justify-center items-center gap-6 p-8 sm:p-10 rounded-2xl max-w-lg w-full">
        <div>
          <img
            src={logoIcon}
            alt="Logo"
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-center">Oops!</h1>
        <p className="text-sm text-center">
          {error
            ? error.message || error.statusText
            : `Something went wrong. We couldn't process your request. Please try again later or go back to the homepage.`}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              <div className="flex justify-center gap-2 items-center">
                Go to Home
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
