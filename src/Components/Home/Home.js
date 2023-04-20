import { Box, Typography, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

const Home = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          width: "80%",
          border: "1px solid black",
          borderRadius: "10px",
          margin: "30px auto",
          backgroundColor: "#fff",
          textAlign: "center",
          boxShadow: "0px 0px 10px 0px",
        }}
      >
        <Typography variant="h3">
          Whats Up (Real-Time-Chat-Application)
        </Typography>
      </Box>
      <Box
        sx={{
          width: "80%",
          border: "1px solid black",
          borderRadius: "10px",
          margin: "auto",
          backgroundColor: "#fff",
          boxShadow: "0px 0px 10px 0px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="Login" value={0} sx={{ width: "50%" }} />
          <Tab label="Sign Up" value={1} sx={{ width: "50%" }} />
        </Tabs>
        {value === 0 ? <Login /> : <SignUp />}
      </Box>
    </>
  );
};

export default Home;
