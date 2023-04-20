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
import React from "react";

function ChatBox() {
  return (
    <Box sx={{ height: "86vh", backgroundColor: "#fff", borderRadius: "6px" }}>
      <Box
        sx={{
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="Demo"
          src="../Images/background.jpg"
          // sx={{ width: "20px", height: "20px" }}
        ></Avatar>
        <Typography variant="h6">Demo Chat</Typography>
        <IconButton>
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
        <LeftMessage Content="tp://localhost:3000/main.31…ttp://localhost:3000/static/js/bundle.js:68885:5)'}tp://localhost:3000/main.31…ttp://localhost:3000/static/js/bundle.js:68885:5)'}" />
        <RightMessage Content="static/js/bundle.js:68885:5)'}" />
        <LeftMessage Content="tp://localhost:3000/main.31…ttp://localhost:3000/static/js/bundle.js:68885:5)'}tp://localhost:3000/main.31…ttp://localhost:3000/static/js/bundle.js:68885:5)'}" />
        <RightMessage Content="static/js/bundle.js:68885:5)'}" />
        <LeftMessage Content="tp://localhost:3000/main.31…ttp://localhost:3000/static/js/bundle.js:68885:5)'}tp://localhost:3000/main.31…ttp://localhost:3000/static/js/bundle.js:68885:5)'}" />
        <RightMessage Content="static/js/bundle.js:68885:5)'}" />
        <LeftMessage Content="tp://localhost:3000/main.31…ttp://localhost:3000/static/js/bundle.js:68885:5)'}tp://localhost:3000/main.31…ttp://localhost:3000/static/js/bundle.js:68885:5)'}" />
        <RightMessage Content="static/js/bundle.js:68885:5)'}" />
        <LeftMessage Content="tp://localhost:3000/main.31…ttp://localhost:3000/static/js/bundle.js:68885:5)'}tp://localhost:3000/main.31…ttp://localhost:3000/static/js/bundle.js:68885:5)'}" />
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
    </Box>
  );
}

export default ChatBox;
