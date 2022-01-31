import { DocumentData } from "@firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

interface ChatMsgProp {
  msg: DocumentData;
}

export default function ChatMessage({ msg }: ChatMsgProp) {
  const user = useAuth();
  const sender = msg.uid === user?.uid;


  return (
    <div className={`message ${sender ? "sent" : "recieve"}`}>
      <img
        src={`${
          msg.photoURL ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        }`}
        alt="user img"
      />
      <p className="text" >{msg.text}</p>
    </div>
  );
}
