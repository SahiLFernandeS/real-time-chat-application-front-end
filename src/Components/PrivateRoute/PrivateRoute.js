import { Navigate } from "react-router-dom";

export default function PrivateRoute(props) {
  const { Component } = props;

  if (sessionStorage.getItem("userName")) {
    return <Component />;
  } else {
    return <Navigate to="/" />;
  }
}
