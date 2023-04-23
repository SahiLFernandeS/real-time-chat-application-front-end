import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SendIcon from "@mui/icons-material/Send";
import LeftMessage from "./LeftMessage";
import RightMessage from "./RightMessage";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "@mui/icons-material";
import { myChatActive } from "../../redux/createChat/createChatActions";

function ChatBox() {
  const dispatch = useDispatch();
  const activeChat = useSelector((state) => state.activeState.activeChat);
  useEffect(() => {}, [activeChat]);

  return (
    <Box sx={{ height: "86vh", backgroundColor: "#fff", borderRadius: "6px" }}>
      {activeChat !== null ? (
        <>
          <Box
            sx={{
              padding: "10px 20px",
              display: "flex",
              // justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{ position: "relative", left: "-10px" }}
              onClick={() => {
                dispatch(myChatActive(null));
              }}
            >
              <ArrowLeft />
            </IconButton>
            <Avatar
              alt="Demo"
              src="../Images/background.jpg"
              sx={{ position: "relative" }}
            ></Avatar>
            <Typography
              sx={{ position: "absolute", right: "40%" }}
              variant="h6"
            >
              Demo Chat
            </Typography>
            <IconButton sx={{ position: "absolute", right: "20px" }}>
              <VisibilityIcon />
            </IconButton>
          </Box>
          <Divider />
          <Stack
            sx={{
              overflowX: "hidden",
              overflowY: "auto",
              background: "url('../Images/Background.jpg')",
              height: "71vh",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "#fff",
            }}
          >
            <RightMessage Content="static/js/bundle.js:68885:5)'}" />
            <LeftMessage Content="tic/js/bundle.js:68885:5)'}" />
            <RightMessage Content="static/js/bundle.js:68885:5)'}" />
            <LeftMessage Content="00/static/js/bundle.js:68885:5)'}" />
            <RightMessage Content="static/js/bundle.js:68885:5)'}" />
          </Stack>
          <Box sx={{ margin: "1px 2px", display: "flex" }}>
            <TextField
              type="text"
              size="small"
              fullWidth
              sx={{ border: "1px solid black", borderRadius: "6px" }}
              color="info"
              placeholder="Text Message"
            ></TextField>
            <IconButton>
              <SendIcon />
            </IconButton>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              padding: "10px 20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            Select the chat to start conversation
          </Box>
        </>
      )}
    </Box>
  );
}

export default ChatBox;
