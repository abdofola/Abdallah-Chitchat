import { useEffect } from "react";
import { DocumentData } from "@firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function ChatMessage({ msg }: DocumentData) {
  const { uid, text, photoURL } = msg;
  const user = useAuth();
  const messageClass = uid === user?.uid ? 'sent' : 'recieve';
  
  useEffect(()=> {
      console.log('Same user?',uid === user?.uid)
  })
  return (
    <div className={messageClass}>
      <img src={photoURL} alt="user profile" />
      <h1>{text}</h1>
    </div>
  );
}
