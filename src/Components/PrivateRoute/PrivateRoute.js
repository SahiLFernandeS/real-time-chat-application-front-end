import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute(props) {
  const { Component } = props;
  const { state } = useLocation();

  if (state.isLogin === false) {
    return <Navigate to="/" />;
  }

  if (sessionStorage.getItem("userName")) {
    return <Component />;
  } else {
    return <Navigate to="/" />;
  }
}
