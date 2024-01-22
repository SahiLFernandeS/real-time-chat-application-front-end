import { Search } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  List,
  Drawer,
  TextField,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GETCALL, POSTCALL } from "../../Services/Services";
import { API } from "../../API";
import {
  fetchAllUserFailure,
  fetchAllUserRequest,
  fetchAllUserSuccess,
  fetchCreateChatFailure,
  fetchCreateChatRequest,
  fetchCreateChatSuccess,
} from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import CustomModal from "../CustomModal/CustomModal";
import Swal from "sweetalert2";

function Header() {
  const token = useSelector((state) => state.login.data.token);
  const userData = useSelector((state) => state.login.data);
  const createChatLoader = useSelector((state) => state.createChat.loading);
  const allUserLoader = useSelector((state) => state.allUser.loading);
  // const { state } = useLocation();

  // const userData = state.loginData;

  // const token = userData.token;

  const [searchUser, setSearchUser] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [name, setName] = useState("");
  const [drawerState, setDrawerState] = useState(false);
  const allUserData = useSelector((state) => state.allUser.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDrawer = (value) => {
    setDrawerState(value);
  };

  const handleSearch = () => {
    dispatch(fetchAllUserRequest());
    GETCALL(`${API.GETALLUSER}?search=${name}`, `${token}`)
      .then((res) => {
        // console.log("GETALLUSERRES---------->", res);
        dispatch(fetchAllUserSuccess(res));
        setSearchUser(res);
      })
      .catch((error) => {
        dispatch(fetchAllUserFailure(error));
        // alert(error);
        Swal.fire({
          icon: "error",
          // title: 'Error',
          text: error,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      });

    setName("");
  };

  const childRef = useRef();

  useEffect(() => {
    if (allUserData) {
      setSearchUser(allUserData);
    }
  }, [searchUser, allUserData]);

  const userClickHandler = (id) => {
    const payload = {
      userId: id,
    };
    dispatch(fetchCreateChatRequest());
    POSTCALL(API.CREATEACCESSCHAT, payload, token)
      .then((res) => {
        toggleDrawer(false);
        // console.log("CREATEACCESSCHATRES------------>", res);
        dispatch(fetchCreateChatSuccess(res));
      })
      .catch((error) => {
        toggleDrawer(false);
        dispatch(fetchCreateChatFailure(error));
        // alert(error);
        Swal.fire({
          icon: "error",
          // title: 'Error',
          text: error,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      });
  };

  const list = (
    <Box
      role="form"
      onClick={() => toggleDrawer(true)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Stack sx={{ margin: "10px 6px", width: "-webkit-fill-available" }}>
        <TextField
          type="text"
          placeholder="Search User Name"
          size="small"
          variant="outlined"
          inputProps={{
            style: {
              width: "100%",
            },
          }}
          onChange={(e) => {
            setName(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <IconButton type="submit" onClick={handleSearch}>
                <Search></Search>
              </IconButton>
            ),
          }}
        />
        <Divider sx={{ margin: "10px 0px" }} />
        {searchUser.length > 0 ? (
          <>
            {allUserLoader ? (
              <LoadingSkeleton />
            ) : (
              <List disablePadding>
                {searchUser.map((text, index) => (
                  <ListItem key={text._id} disableGutters disablePadding>
                    <ListItemButton onClick={() => userClickHandler(text._id)}>
                      <ListItemIcon>
                        <Avatar alt="user" variant="circular">
                          {text.name}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText primary={text.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </>
        ) : (
          "No Data Found"
        )}
      </Stack>
      {createChatLoader && <Loader />}
    </Box>
  );
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        width: "99.5%",
        height: "7vh",
        maxHeight: "7vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: "6px",
        padding: "0px 12px",
      }}
    >
      <Box>
        <Button
          variant="text"
          startIcon={<i className="fa-solid fa-magnifying-glass"></i>}
          onClick={() => toggleDrawer(true)}
        >
          <Typography
            sx={{ display: { xs: "none", sm: "block" } }}
            variant="body1"
          >
            Search
          </Typography>
        </Button>
        <Drawer
          anchor="left"
          open={drawerState}
          onClose={() => toggleDrawer(false)}
          PaperProps={{
            sx: { width: "290px" },
          }}
        >
          {list}
        </Drawer>
      </Box>

      <Box>
        <Typography variant="h5">Whats Up</Typography>
      </Box>

      <Box>
        <Button
          id="basic-button"
          variant="text"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          startIcon={
            <Avatar sx={{ width: 24, height: 24 }}>Sahil Fernandes</Avatar>
          }
        >
          <Typography
            sx={{ display: { xs: "none", sm: "block" }, width: 24, height: 24 }}
            variant="body1"
          >
            <KeyboardArrowDownIcon />
          </Typography>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              childRef.current.handleOpen();
            }}
          >
            My Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              sessionStorage.clear();
              localStorage.clear();
              handleClose();
              navigate("/");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>

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
            {userData.name}
          </Avatar>
          <Typography>{userData.name}</Typography>
          <Typography>{userData.email}</Typography>
        </Box>
      </CustomModal>
    </Box>
  );
}

export default Header;
