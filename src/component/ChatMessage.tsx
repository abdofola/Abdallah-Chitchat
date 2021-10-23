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

    !sender && setPhoto(user?.photoURL);
  }, [sender, user]);

  return (
    <div className={`message ${sender ? "sent" : "recieve"}`}>
      {photo && <img className="profile" src={`${photo}`} alt="user profile" />}
      <h2 className="text">{msg.text}</h2>
    </div>
  );
}
