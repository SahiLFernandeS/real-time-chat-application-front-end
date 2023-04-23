import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import { GETCALL, GETCALLWITHCANCEL, POSTCALL } from "../../Services/Services";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../API";
import {
  fetchCreateChatFailure,
  fetchCreateChatRequest,
  fetchCreateChatSuccess,
  myChatActive,
} from "../../redux/createChat/createChatActions";
import Swal from "sweetalert2";
import CustomModal from "../CustomModal/CustomModal";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm } from "react-hook-form";
import Loader from "../Loader/Loader";

let cancelToken;

function MyChats() {
  const [userList, setuserList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [createGroupLoader, setCreateGroupLoader] = useState(false);
  const activeChat = useSelector((state) => state.activeState.activeChat);
  const token = useSelector((state) => state.login.data.token);
  const createChat = useSelector((state) => state.createChat.data);
  const [searchUser, setSearchUser] = useState([]);
  const [addedUser, setAddedUser] = useState([]);
  const [groupName, setgroupName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const childRef = useRef();

  const handleGroupOrNormalChat = (text) => {
    return text.isGroupChat !== true ? text.users[1].name : text.chatName;
  };

  useEffect(() => {
    setLoader(true);
    GETCALL(API.FETCHCHATS, token)
      .then((res) => {
        setuserList(res);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });
  }, [token, createChat]);

  const userOnchangeHandler = (userName) => {
    if (cancelToken) {
      cancelToken.cancel("Operation canceled due to new request.");
    }

    cancelToken = axios.CancelToken.source();

    GETCALLWITHCANCEL(
      `${API.GETALLUSER}?search=${userName}`,
      cancelToken.token,
      token
    )
      .then((res) => setSearchUser(res))
      .catch((error) => console.log(error));
  };

  const createGroupHandler = (data) => {
    setCreateGroupLoader(true);
    const userList = JSON.stringify(addedUser.map((item) => item._id));
    const payload = {
      users: userList,
      name: data.groupName,
    };
    // console.log("payload------->", payload);
    if (addedUser.length < 2) {
      childRef.current.handleClose();
      setCreateGroupLoader(false);
      return Swal.fire({
        icon: "error",
        text: "Please select more then 1 users to create group",
      });
    }
    dispatch(fetchCreateChatRequest());
    POSTCALL(`${API.CREATEGROUPCHAT}`, payload, token)
      .then((res) => {
        setAddedUser([]);
        setgroupName("");
        childRef.current.handleClose();
        dispatch(fetchCreateChatSuccess(res));
        setCreateGroupLoader(false);
      })
      .catch((error) => {
        setCreateGroupLoader(false);
        childRef.current.handleClose();
        dispatch(fetchCreateChatFailure(error));
        return Swal.fire({
          icon: "error",
          text: error,
        });
      });
  };

  useEffect(() => {}, [userList, token]);

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
        <Button onClick={() => childRef.current.handleOpen()}>
          Create Group
        </Button>
      </Box>
      <Divider />
      <List disablePadding>
        {loader ? (
          <LoadingSkeleton />
        ) : userList.length > 0 ? (
          userList.map((text, index) => (
            <ListItem key={text._id} disablePadding>
              <ListItemButton
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "rgb(34, 112, 90)",
                    color: "white",
                    ":hover": {
                      backgroundColor: "rgb(34, 112, 90)",
                      color: "white",
                    },
                  },
                }}
                selected={activeChat === index + 1 ? true : false}
                onClick={() => {
                  // setactiveChat(index);
                  dispatch(myChatActive(index + 1));
                }}
              >
                <ListItemIcon>
                  <Avatar alt="user" variant="circular">
                    {handleGroupOrNormalChat(text)}
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary={handleGroupOrNormalChat(text)} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <Box
            sx={{
              padding: "10px 20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            No Chats Available
          </Box>
        )}
      </List>
      <CustomModal
        ref={childRef}
        onClose={() => childRef.current.handleClose()}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          component="form"
          onSubmit={handleSubmit(createGroupHandler)}
        >
          <Typography variant="h6">Create Group</Typography>
          <TextField
            type="text"
            size="small"
            fullWidth
            placeholder="Enter group name"
            sx={{ marginTop: "10px" }}
            onChange={(e) => setgroupName(e.target.value)}
            {...register("groupName", {
              required: true,
              value: groupName,
            })}
          ></TextField>
          {errors.groupName && (
            <span style={{ color: "red" }}>Please provide valid input</span>
          )}
          {/* added users */}
          <Box display={"inherit"}>
            {addedUser?.map((user) => {
              return (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      backgroundColor: "purple",
                      color: "white",
                      alignItems: "center",
                      margin: "10px 2px",
                      padding: "5px 5px",
                      borderRadius: "8px",
                    }}
                    // key={user._id}
                  >
                    {user.name}
                    <IconButton
                      sx={{ color: "#fff" }}
                      onClick={() =>
                        setAddedUser(
                          addedUser.filter((item) => item._id !== user._id)
                        )
                      }
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                </>
              );
            })}
          </Box>
          <TextField
            type="text"
            size="small"
            fullWidth
            placeholder="Enter user name"
            sx={{ marginTop: "10px" }}
            onChange={(e) => userOnchangeHandler(e.target.value)}
          ></TextField>
          {/* Displaying Searched user here in list */}
          <List disablePadding sx={{ width: "100%" }}>
            {searchUser?.slice(0, 4).map((user) => {
              return (
                <ListItem key={user._id} disablePadding disableGutters>
                  <ListItemButton
                    sx={{
                      ":hover": {
                        backgroundColor: "rgb(34, 112, 90)",
                        color: "white",
                      },
                    }}
                    // selected={activeChat === index + 1 ? true : false}
                    onClick={() => setAddedUser([...addedUser, user])}
                  >
                    <ListItemIcon>
                      <Avatar alt="user" variant="circular">
                        {user.name}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary={user.name} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Button
            size="small"
            sx={{ marginTop: "10px" }}
            color="secondary"
            variant="contained"
            type="submit"
            // onSubmit={handleSubmit(createGroupHandler)}
          >
            Create
          </Button>
        </Box>
      </CustomModal>
      {createGroupLoader && <Loader />}
    </Box>
  );
}

export default MyChats;
