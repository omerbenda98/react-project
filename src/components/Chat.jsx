import React, { useEffect, useState } from "react";
import "../pages/pages_css/ChatPage.css";
import axios from "axios";

function Chat({ socket, userID, otherUserID }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const createRoomId = (userId, otherUserId) => {
    return [userId, otherUserId].sort().join("-");
  };

  useEffect(() => {
    const roomID = createRoomId(userID, otherUserID);
    socket.emit("joinRoom", roomID);
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get("/chats/history", {
          params: {
            roomID: roomID,
          },
        });
        setMessageList(response.data);
      } catch (error) {
        console.error("Error fetching chat history", error);
      }
    };
    fetchChatHistory();

    const receiveMessage = (data) => {
      setMessageList((prevMessages) => [...prevMessages, data]);
    };

    socket.on("receive_message", receiveMessage);

    return () => {
      socket.emit("leaveRoom", roomID);
      socket.off("receive_message", receiveMessage);
    };
  }, [userID, otherUserID, socket]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDate();
    let month = date.getMonth();

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutes} ${day}/${month}`;
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const roomID = createRoomId(userID, otherUserID);
      const senderInfo = await axios.get(`/users/userInfo`);
      const currentTime = new Date().toISOString();
      const timestamp = Date.now();
      const messageData = {
        roomID,
        senderID: userID,
        recepientID: otherUserID,
        content: currentMessage,
        time: formatDate(currentTime),
        author: senderInfo.data.firstName,
        timestamp,
      };

      socket.emit("send_message", messageData);
      setCurrentMessage("");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <div className="message-container">
          {" "}
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={userID === messageContent.senderID ? "you" : "other"}
                key={messageContent._id + Date.now()}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.content}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>{" "}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
