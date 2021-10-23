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
      <h2 className="text">{msg.text}</h2>
    </div>
  );
}
