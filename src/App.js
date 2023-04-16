import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Chat from "./Components/Chat/Chat";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { Container } from "react-bootstrap";

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

  return (
    <Container fluid className="main">
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
