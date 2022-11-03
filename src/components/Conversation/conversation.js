import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.id);

    const getUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users?userId=` + friendId
        );
        setUser(res.data);
      } catch (error) {}
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversation_img"
        src={
          user?.picture
            ? user.picture
            : "https://www.menshairstyletrends.com/wp-content/uploads/2020/12/thebarbercole-medium-length-pompadour-haircut-for-men-998x1024.jpg"
        }
        alt=""
      />
      <span className="conversation_name">{user?.username}</span>
    </div>
  );
}
