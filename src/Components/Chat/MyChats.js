import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import { GETCALL } from "../../Services/Services";
import { useSelector } from "react-redux";
import { API } from "../../API";

function MyChats() {
  const [userList, setuserList] = useState([]);
  const token = useSelector((state) => state.login.data.token);

  useEffect(() => {
    GETCALL(API.FETCHCHATS, token)
      .then((res) => {
        // console.log("FETCHCHATSRES--------->", res);
        setuserList(res);
      })
      .catch((error) => {
        alert(error);
      });
  }, [userList, token]);

  return (
    <Box
      sx={{
        overflowX: "hidden",
        overflowY: "auto",
        height: "86vh",
        backgroundColor: "#fff",
        borderRadius: "6px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
        }}
      >
        <Typography variant="h6">My Chats</Typography>
        <Button>Create Group</Button>
      </Box>
      <Divider />
      <List disablePadding>
        {userList.length > 0 ? (
          userList.map((text, index) => (
            <ListItem key={text.users[1]._id} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar alt="user" variant="circular" />
                </ListItemIcon>
                <ListItemText primary={text.users[1].name} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <LoadingSkeleton />
        )}
      </List>
    </Box>
  );
}

export default MyChats;
