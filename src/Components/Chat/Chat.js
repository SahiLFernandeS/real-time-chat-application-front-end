import React, { useEffect } from "react";
import Header from "../Header/Header";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
import { Box, Grid, Paper, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

export var socket = io("http://192.168.0.116:8000", {});

// console.log(
//   "localStorage.getItem",
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).login).data.token
// );

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Chat() {
  const activeChat = useSelector((state) => state.activeState.activeChat);
  const activeChatData = useSelector(
    (state) => state.activeState.activeChatData
  );
  const allChat = useSelector((state) => state.allChat.data);

  const { state } = useLocation();

  console.log("state---------->", state);

  return (
    <>
      <Box
        sx={{
          // backgroundColor: "#b1b1b1",
          height: "8svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          // padding: "0px 8px",
        }}
      >
        <Header />
      </Box>

      <Box sx={{ flexGrow: 1 }} m={1}>
        <Grid container spacing={1}>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            display={
              activeChat
                ? { xs: "none", sm: "none", md: "block" }
                : { xs: "block", sm: "block" }
            }
          >
            <Item sx={{ height: "88svh" }}>
              <MyChats activeChat={activeChat} allChat={allChat} />
            </Item>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            display={
              activeChat
                ? { xs: "block", sm: "block", md: "block" }
                : { xs: "none", sm: "none", md: "block" }
            }
          >
            <Item sx={{ height: "88svh" }}>
              <ChatBox
                activeChatData={activeChatData}
                activeChat={activeChat}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Chat;
