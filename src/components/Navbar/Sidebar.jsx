import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./navbar_css/Sidebar.css";
import UserAvatar from "./NavProfile";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import ChatIcon from "@mui/icons-material/Chat";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChats, setActiveChats] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const navigate = useNavigate();

  const toggleDrawer = (open) => {
    setIsOpen(open);
  };
  useEffect(() => {
    const fetchActiveChats = async () => {
      try {
        const userInfoResponse = await axios.get(`/users/userInfo`);
        const userID = userInfoResponse.data._id;
        setUserInfo(userInfoResponse.data);

        const response = await axios.get("/chats/activeChats", {
          params: { userID },
        });
        setActiveChats(response.data);
      } catch (error) {
        console.error("Error fetching active chats", error);
      }
    };
    if (isLoggedIn) {
      fetchActiveChats();
    }
  }, [isLoggedIn]);

  const handleListItemClick = (chat) => {
    setIsOpen(false);
    navigate(`/chats/${chat.otherUserID}/${userInfo._id}`);
  };

  return (
    <div className="profile-bgc">
      <Button onClick={() => toggleDrawer(true)} className="sideBarButton">
        <ChatIcon />
      </Button>
      {userInfo ? (
        <Drawer anchor="left" open={isOpen} onClose={() => toggleDrawer(false)}>
          <Link to="/profile" className="profile-link">
            <div className="profile-container">
              {!userInfo.imageUrl ? (
                <UserAvatar />
              ) : (
                <img
                  src={userInfo.imageUrl}
                  alt={`${userInfo.firstName} ${userInfo.lastName}`}
                  className="user-avatar"
                />
              )}
              <Typography>
                {userInfo.firstName} {userInfo.lastName}
              </Typography>
            </div>
          </Link>
          {activeChats.length === 0 ? (
            <p>No Active Chats</p>
          ) : (
            <List>
              {activeChats.map((chat, index) => (
                <ListItem
                  button
                  key={uuidv4()}
                  onClick={() => handleListItemClick(chat)}
                >
                  <ListItemText
                    primary={chat.otherUserName}
                    secondary={chat.lastMessage.content}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Drawer>
      ) : (
        <UserAvatar />
      )}
    </div>
  );
}

export default Sidebar;
