import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Home from "./Components/Home/Home";
import { Container } from "@mui/material";
import Chat from "./Components/Chat/Chat";
import { Provider } from "react-redux";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "chat",
    element: <PrivateRoute Component={Chat} />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Container disableGutters={true} maxWidth="xl" sx={{ height: "100vh" }}>
        <RouterProvider router={router} />
      </Container>
    </PersistGate>
  </Provider>
);
