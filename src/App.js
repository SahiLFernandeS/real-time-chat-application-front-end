import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Chat from "./Components/Chat/Chat";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "chat",
      element: <PrivateRoute Component={Chat} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
