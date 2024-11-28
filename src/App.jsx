import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Registration, { action as regAction } from "./pages/registration";
import { AppProvider } from "./contexts/AppContext";
import ErrorPage from "./error-page";
import Login, { loginAction } from "./pages/log-in";
import Home from "./pages/Home";
import Messages, {
  loader as messageLoader,
  action as messageAction,
} from "./pages/Messages";
import { AuthProvider } from "./contexts/AuthContext";
import MessageForm, {
  loader as messageFormLoader,
  action as messageFormAction,
} from "./pages/MessageForm";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import ChangePassword from "./pages/ChangePassword";
import ChangeEmail from "./pages/ChangeEmail";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <AuthRoute />,
    errorElement: <ErrorPage />,
    children: [
      { path: "register", element: <Registration />, action: regAction },
      { path: "login", element: <Login />, action: loginAction },
    ],
  },
  {
    path: "dashboard",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "messages",
        element: <Messages />,
        loader: messageLoader,
        action: messageAction,
      },
      { path: "settings", element: <Settings /> },
      { path: "change-password", element: <ChangePassword /> },
      { path: "change-email", element: <ChangeEmail /> },
    ],
  },
  {
    path: "/users/:username",
    element: <MessageForm />,
    loader: messageFormLoader,
    action: messageFormAction,
    errorElement: <ErrorPage />,
  },
]);

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </AppProvider>
  );
}
