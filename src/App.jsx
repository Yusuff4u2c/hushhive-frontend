import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Registration from "./pages/registration";
import { AppProvider } from "./contexts/AppContext";
import ErrorPage from "./error-page";
import Login from "./pages/log-in";
import Home from "./pages/Home";
import Messages from "./pages/messages";
import { AuthProvider } from "./contexts/AuthContext";
import MessageForm from "./pages/MessageForm";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/auth",
    element: <AuthRoute />,
    children: [
      { path: "register", element: <Registration /> },
      { path: "login", element: <Login /> },
    ],
  },

  {
    path: "auth/home",
    element: <ProtectedRoute />,
    children: [{ path: "", element: <Home /> }],
  },

  {
    path: "auth/messages",
    element: <ProtectedRoute />,
    children: [{ path: "", element: <Messages /> }],
  },

  {
    path: "auth/settings",
    element: <ProtectedRoute />,
    children: [{ path: "", element: <Settings /> }],
  },
  { path: "/:username", element: <MessageForm /> },
]);

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppProvider>
  );
}
