import {
  Avatar,
  Box,
  IconButton,
  Stack,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  FormControl,
  CircularProgress,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "@mui/icons-material";
import {
  myChatActive,
  myChatActiveData,
} from "../../redux/createChat/createChatActions";
import CustomModal from "../CustomModal/CustomModal";
import axios from "axios";
import { API } from "../../API";
import {
  GETCALL,
  GETCALLWITHCANCEL,
  POSTCALL,
  PUTCALL,
} from "../../Services/Services";
import Swal from "sweetalert2";
import {
  fetchAllChatFailure,
  fetchAllChatRequest,
  fetchAllChatSuccess,
} from "../../redux";
import { filterMessages } from "../../CommonFunctions/CommonFunction";
import ScrollableFeed from "react-scrollable-feed";
import { socket } from "./Chat";

let cancelToken;

function ChatBox(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.data.token);
  const userId = useSelector((state) => state.login.data._id);
  const [searchUser, setSearchUser] = useState([]);
  const [addedUser, setAddedUser] = useState([]);
  const [chatName, setChatName] = useState("");
  const { activeChatData, activeChat } = props;
  const [newMessages, setNewMessages] = useState([]);
  const [enterMessages, setEnterMessages] = useState("");
  const [loader, setLoader] = useState(false);

  const childRef = useRef();

  // console.log("socket------->", props.socket);

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
  };

  const handleGroupOrNormalChatEmail = (text) => {
    if (text.isGroupChat !== true) {
      if (text.users[1]._id !== userId) {
        return text.users[1].email;
      } else {
        return text.users[0].email;
      }
    } else {
      return text.chatName;
    }
  };

  const openGroupModalHandler = (groupChatData) => {
    setAddedUser(groupChatData.users);
    childRef.current.handleOpen();
  };

  const addUserToGroupHandler = (user) => {
    const payload = { chatId: activeChatData._id, userId: user._id };
    PUTCALL(API.ADDUSERTOGROUP, payload, token)
      .then((res) => {
        setAddedUser([...addedUser, user]);
        dispatch(myChatActive(1));
        dispatch(myChatActiveData(res));
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error,
        });
      });
  };

  const removeUserFromGroupHandler = (addedUser, id) => {
    const payload = { chatId: activeChatData._id, userId: id };
    PUTCALL(API.REMOVEUSERFROMGROUP, payload, token)
      .then((res) => {
        setAddedUser(addedUser.filter((item) => item._id !== id));
        dispatch(myChatActiveData(res));
        dispatch(myChatActive(1));
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error,
        });
      });
  };

  const renameGroupHandler = (e) => {
    e.preventDefault();
    const payload = {
      chatId: activeChatData._id,
      chatName: chatName,
    };

    PUTCALL(API.RENAMEGROUPNAME, payload, token)
      .then((res) => {
        dispatch(myChatActiveData(res));
        dispatch(myChatActive(1));
      })
      .catch((error) => {
        alert(error);
      });
    setChatName("");
  };

  const userOnchangeHandler = (userName) => {
    if (cancelToken) {
      cancelToken.cancel("Operation canceled due to new request.");
    }

    cancelToken = axios.CancelToken.source();

    GETCALLWITHCANCEL(
      `${API.GETALLUSER}?search=${userName}`,
      cancelToken.token,
      token
    ).then((res) => setSearchUser(res));
  };

  useEffect(() => {
    setLoader(true);
    dispatch(fetchAllChatRequest());
    GETCALL(API.FETCHCHATS, token)
      .then((res) => {
        dispatch(fetchAllChatSuccess(res));
        setLoader(false);
      })
      .catch((error) => {
        dispatch(fetchAllChatFailure(error));
        setLoader(false);
        Swal.fire({
          icon: "error",
          text: error,
        });
      });
  }, [activeChat, activeChatData, token]);

  const fetchChatMessages = () => {
    if (!activeChat) return;
    let chatId = activeChatData._id;
    GETCALL(API.FETCHCHATSMESSAGES + `/${chatId}`, token)
      .then((res) => {
        setNewMessages(res);
        // console.log("res-------->", res);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error,
        });
      });
  };

  useEffect(() => {
    let chatId = activeChatData._id;
    socket.emit("joinRoom", { chatId: chatId });
    fetchChatMessages();
  }, [activeChat]);

  useEffect(() => {
    // console.log("hellooooo");
    socket.on("newMessage", (data) => {
      console.log("data------>", data);
      setNewMessages((prev) => {
        return [...prev, data];
      });
    });
  }, []);

  // useEffect(() => {}, [newMessages]);

  const enterMessageHandler = (event) => {
    const chatId = activeChatData._id;
    const payload = { content: enterMessages, chatId: chatId };
    if (event.key === "Enter" && enterMessages) {
      // setLoader(true);
      setEnterMessages("");
      POSTCALL(API.SENDMESSAGES, payload, token)
        .then((res) => {
          // console.log("res------>", res);
          socket.emit("sendMessage", res);
          // setNewMessages([...newMessages, res]);
          // setLoader(false);
        })
        .catch((error) => {
          // setLoader(false);
          Swal.fire({
            icon: "error",
            text: error,
          });
        });
    }
  };

  const messageOnChangeHandler = (e) => {
    setEnterMessages(e.target.value);
  };

  return (
    <Stack
      sx={{ height: "100%", backgroundColor: "#fff", borderRadius: "6px" }}
    >
      {activeChat !== null ? (
        <>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
            }}
            variant="h6"
          >
            <IconButton
              sx={{ display: { sm: "flex", md: "none" } }}
              onClick={() => {
                dispatch(myChatActive(null));
                dispatch(myChatActiveData([]));
              }}
            >
              <ArrowLeft />
            </IconButton>
            {handleGroupOrNormalChat(activeChatData)}
            {activeChatData.isGroupChat !== true ? (
              //Single chat modal
              <>
                <IconButton onClick={() => childRef.current.handleOpen()}>
                  <RemoveRedEyeIcon />
                </IconButton>
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
                  >
                    <Avatar sx={{ width: "100px", height: "100px" }}>
                      {handleGroupOrNormalChat(activeChatData)}
                    </Avatar>
                    <Typography>
                      {handleGroupOrNormalChat(activeChatData)}
                    </Typography>
                    <Typography>
                      {handleGroupOrNormalChatEmail(activeChatData)}
                    </Typography>
                  </Box>
                </CustomModal>
              </>
            ) : (
              //Group Chat Modal
              <>
                <IconButton
                  onClick={() => {
                    openGroupModalHandler(activeChatData);
                  }}
                >
                  <RemoveRedEyeIcon />
                </IconButton>
                <CustomModal
                  ref={childRef}
                  onClose={() => childRef.current.handleClose()}
                >
                  <Box
                    component="form"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onSubmit={(e) => renameGroupHandler(e)}
                  >
                    <Typography>
                      Group Name: {handleGroupOrNormalChat(activeChatData)}
                    </Typography>
                    <TextField
                      sx={{ marginTop: "10px" }}
                      type="text"
                      placeholder="Rename Group"
                      fullWidth
                      size="small"
                      value={chatName}
                      onChange={(e) => setChatName(e.target.value)}
                    ></TextField>

                    <Box
                      display={"inherit"}
                      sx={{ width: "100%", overflow: "auto" }}
                    >
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
                                onDelete={() => {
                                  removeUserFromGroupHandler(
                                    addedUser,
                                    user._id
                                  );
                                }}
                              />
                            </Box>
                          </>
                        );
                      })}
                    </Box>

                    <TextField
                      sx={{ marginTop: "10px" }}
                      type="text"
                      placeholder="Search User"
                      fullWidth
                      size="small"
                      onChange={(e) => userOnchangeHandler(e.target.value)}
                    ></TextField>
                    <List disablePadding sx={{ width: "100%" }}>
                      {searchUser?.slice(0, 4).map((user) => {
                        return (
                          <ListItem
                            key={user._id}
                            disablePadding
                            disableGutters
                          >
                            {/* {console.log(user._id)} */}
                            <ListItemButton
                              sx={{
                                ":hover": {
                                  backgroundColor: "rgb(34, 112, 90)",
                                  color: "white",
                                },
                              }}
                              // selected={activeChat === index + 1 ? true : false}
                              onClick={() => {
                                addUserToGroupHandler(user);
                              }}
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
                      sx={{ marginTop: "10px" }}
                      variant="contained"
                      color="secondary"
                      type="submit"
                    >
                      Rename Group
                    </Button>
                  </Box>
                </CustomModal>
              </>
            )}
          </Typography>
          <Box
            sx={{
              textAlign: "left",
              width: "100%",
              backgroundColor: "#b1b1b1",
              height: "90.3%",
              borderRadius: "12px",
            }}
          >
            {loader !== true ? (
              <>
                <div style={{ height: "90%", overflow: "auto" }}>
                  <ScrollableFeed>
                    {newMessages &&
                      newMessages.map((m, i) => (
                        <div key={m._id}>
                          {filterMessages(newMessages, i, userId)}
                        </div>
                      ))}
                  </ScrollableFeed>
                </div>
                <FormControl
                  onKeyDown={enterMessageHandler}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "8px",
                  }}
                >
                  <TextField
                    type="text"
                    size="small"
                    placeholder="Enter New Message here...."
                    onChange={messageOnChangeHandler}
                    value={enterMessages}
                  ></TextField>
                </FormControl>
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <CircularProgress color="inherit" />
              </Box>
            )}
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
    </Stack>
  );
}

export default ChatBox;
