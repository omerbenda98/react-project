import io from "socket.io-client";
import Chat from "../components/Chat";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const socket = io("https://dog-adopt-app-ae8e92c9ad07.herokuapp.com");
  const { tokenId, userId } = useParams();

  return (
    <div className="chat-page-container">
      <Chat socket={socket} userID={tokenId} otherUserID={userId} />
    </div>
  );
};

export default ChatPage;
