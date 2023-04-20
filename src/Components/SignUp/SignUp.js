import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import React from "react";
import { useDispatch } from "react-redux";
import { POSTCALL } from "../../Services/Services";
import { API } from "../../API";
import {
  fetchLoginFailure,
  fetchLoginRequest,
  fetchLoginSuccess,
} from "../../redux";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(fetchLoginRequest());
    POSTCALL(API.REGISTER, data)
      .then((res) => {
        dispatch(fetchLoginSuccess(res));
        sessionStorage.setItem("userName", res.name);
        navigate("/chat");
      })
      .catch((error) => {
        dispatch(fetchLoginFailure(error));
      });
  };

  return (
    <Box
      sx={{ padding: "10px" }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        id="outlined-name-input"
        label="User Name"
        type="text"
        sx={{ width: "100%", margin: "10px 0px" }}
        size="small"
        {...register("name", {
          required: true,
          maxLength: 20,
        })}
      />
      {errors.userName && (
        <span style={{ color: "red" }}>Please provide valid input</span>
      )}
      <TextField
        id="outlined-email-input"
        label="Email Address"
        type="text"
        sx={{ width: "100%", margin: "10px 0px" }}
        size="small"
        {...register("email", {
          required: true,
          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
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
        {...register("password", {
          required: true,
        })}
      />
      {errors.password && (
        <span style={{ color: "red" }}>Please provide valid input</span>
      )}
      <TextField
        id="outlined-cpassword-input"
        label="Confirm Password"
        type="password"
        sx={{ width: "100%", margin: "10px 0px" }}
        size="small"
        {...register("confirmPassword", {
          required: true,
        })}
      />
      {errors.confirmPassword && (
        <span style={{ color: "red" }}>Please provide valid input</span>
      )}
      <TextField
        id="outlined-Submit-input"
        type="submit"
        sx={{
          width: "100%",
          margin: "10px 0px",
          backgroundColor: "rgb(0 137 255)",
          input: { color: "#fff" },
        }}
        value="Sign Up"
        size="small"
      />
    </Box>
  );
}

export default SignUp;
