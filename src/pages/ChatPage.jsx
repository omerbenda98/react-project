import io from "socket.io-client";
import Chat from "../components/Chat";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const socket = io("http://localhost:8181");
  const { tokenId, userId } = useParams();

  return (
    <div className="chat-page-container">
      <Chat socket={socket} userID={tokenId} otherUserID={userId} />
    </div>
  );
};

export default ChatPage;
