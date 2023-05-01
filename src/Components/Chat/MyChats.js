import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
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
  myChatActiveData,
} from "../../redux/createChat/createChatActions";
import Swal from "sweetalert2";
import CustomModal from "../CustomModal/CustomModal";
import axios from "axios";
import { useForm } from "react-hook-form";
import Loader from "../Loader/Loader";
import {
  fetchAllChatFailure,
  fetchAllChatRequest,
  fetchAllChatSuccess,
} from "../../redux";

let cancelToken;

function MyChats(props) {
  const [loader, setLoader] = useState(false);
  const [createGroupLoader, setCreateGroupLoader] = useState(false);
  const { activeChat, allChat } = props;
  const token = useSelector((state) => state.login.data.token);
  const userId = useSelector((state) => state.login.data._id);
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
    if (text.isGroupChat !== true) {
      if (text.users[1]._id !== userId) {
        return text.users[1].name;
      } else {
        return text.users[0].name;
      }
    } else {
      return text.chatName;
    }
    // return text.isGroupChat !== true ? text.users[1].name : text.chatName;
  };

  useEffect(() => {
    setLoader(true);
    dispatch(fetchAllChatRequest());
    GETCALL(API.FETCHCHATS, token)
      .then((res) => {
        setLoader(false);
        dispatch(fetchAllChatSuccess(res));
      })
      .catch((error) => {
        setLoader(false);
        dispatch(fetchAllChatFailure(error));
        Swal.fire({
          icon: "error",
          text: error,
        });
      });
  }, [createChat, dispatch, token]);

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

  useEffect(() => {}, [allChat, token]);

  return (
    <Box
      sx={{
        overflowX: "hidden",
        overflowY: "auto",
        height: "100%",
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
          // backgroundColor: "#b1b1b1",
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
        ) : allChat.length > 0 ? (
          allChat.map((text, index) => (
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
                  // console.log(text);
                  dispatch(myChatActive(index + 1));
                  dispatch(myChatActiveData(text));
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
          <Box display={"inherit"} sx={{ width: "100%", overflow: "auto" }}>
            {addedUser?.map((user) => {
              return (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      margin: "10px 2px",
                    }}
                  >
                    <Chip
                      color="secondary"
                      label={user.name}
                      onDelete={() =>
                        setAddedUser(
                          addedUser.filter((item) => item._id !== user._id)
                        )
                      }
                    />
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
