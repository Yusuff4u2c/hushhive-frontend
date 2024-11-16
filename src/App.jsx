import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import { AppProvider } from "./contexts/AppContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
]);

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
