import { useEffect, useState } from "react";
import { DocumentData } from "@firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

interface ChatMsgProp {
  msg: DocumentData;
}

export default function ChatMessage({ msg }: ChatMsgProp) {
  const [photo, setPhoto] = useState<string | null>();
  const user = useAuth();
  const sender = msg.uid === user?.uid;

  useEffect(() => {
    // const [data] = user?.providerData;
    // console.log("user:", user);
    setPhoto(user?.photoURL);
  }, [user?.photoURL]);

  return (
    <div className={`message ${sender ? "sent" : "recieve"}`}>
      {!sender && <img src={`${photo}`} alt="user profile" />}
      <h2 className="text">{msg.text}</h2>
    </div>
  );
}
