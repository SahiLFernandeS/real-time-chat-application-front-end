import React from "react";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Container } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Home from "./Components/Home/Home";
import Chat from "./Components/Chat/Chat";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

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

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Container
          disableGutters={true}
          maxWidth="xl"
          sx={{ height: "100svh" }}
        >
          <RouterProvider router={router} />
        </Container>
      </PersistGate>
    </Provider>
  );
}
