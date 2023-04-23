import React from "react";
import Header from "../Header/Header";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
import { Box, Grid, Paper, styled } from "@mui/material";
import { useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Chat() {
  const activeChat = useSelector((state) => state.activeState.activeChat);
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#b1b1b1",
          height: "8vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            <Item sx={{ backgroundColor: "#b1b1b1" }}>
              <MyChats />
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
            <Item sx={{ backgroundColor: "#b1b1b1" }}>
              <ChatBox />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Chat;
