import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { POSTCALL } from "../../Services/Services";
// eslint-disable-next-line
import { useDispatch } from "react-redux";
// eslint-disable-next-line
import {
  fetchLoginFailure,
  fetchLoginRequest,
  fetchLoginSuccess,
} from "../../redux";
import { API } from "../../API";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    // eslint-disable-next-line
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // console.log(data);

    dispatch(fetchLoginRequest());
    POSTCALL(API.LOGIN, data)
      .then((res) => {
        // console.log("res------->", res);
        dispatch(fetchLoginSuccess(res));
        sessionStorage.setItem("userName", res.name);
        navigate("/chat");
      })
      .catch((error) => {
        dispatch(fetchLoginFailure(error));
      });
    setEmail("");
    setPassword("");
  };
  return (
    <Box
      sx={{ padding: "10px" }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        id="outlined-email-input"
        label="Email Address"
        type="text"
        sx={{ width: "100%", margin: "10px 0px" }}
        size="small"
        // required

        onChange={(e) => {
          setEmail(e.target.value);
        }}
        // value={email}
        {...register("email", {
          required: true,
          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          value: email,
        })}
      />
      {errors.email && (
        <span style={{ color: "red" }}>Please provide valid input</span>
      )}
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        sx={{ width: "100%", margin: "10px 0px" }}
        size="small"
        // required

        onChange={(e) => {
          setPassword(e.target.value);
        }}
        {...register("password", { required: true, value: password })}
        // value={password}
      />
      {errors.password && (
        <span style={{ color: "red" }}>Please provide valid input</span>
      )}
      <Button
        variant="contained"
        type="submit"
        color="success"
        sx={{
          width: "100%",
          margin: "10px 0px",
        }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        color="error"
        sx={{
          width: "100%",
          margin: "10px 0px",
        }}
        onClick={() => {
          setEmail("guest@sahil.com");
          setValue("email", "guest@sahil.com");
          setPassword("1234");
          setValue("password", "1234");
        }}
      >
        Guest Login
      </Button>
    </Box>
  );
}

export default Login;
