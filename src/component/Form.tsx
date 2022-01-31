import * as React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useThemeContext } from "../contexts/themeContext";
import { useHeight } from "../custom_hooks/useHeight";
import { addDoc, serverTimestamp, messagesRef } from "../firebase/firestore";
import {StateProps} from '../interfaces/props'
import { FaTelegramPlane } from "react-icons/fa";



export default function Form({setFormHeight}: StateProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [newMsg, setNewMsg] = React.useState<string>();
  const user = useAuth();
  const theme = useThemeContext();
  const [ref, getHeight] = useHeight<HTMLFormElement>();

//   sideEffect to set the form height when component renders 
  React.useEffect(() => {
    setFormHeight(getHeight());
  },[getHeight, setFormHeight]);

  // handle message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputElem = inputRef.current;

    if (inputElem) inputElem.value = "";

    try {
      if (newMsg) {
        console.log(" message state is updated");
        await addDoc(messagesRef, {
          text: newMsg,
          createdAt: serverTimestamp(),
          uid: user?.uid,
          photoURL: user?.photoURL,
        });
      }
      console.log("message state is not updated yet!");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form ref={ref} className={`App-theme-${theme?.themeAlias}`} onSubmit={handleSubmit}>
      <input ref={inputRef} className={`${theme?.themeAlias}`} type="text" placeholder="Enter your message ..." />
      <button type="submit" onClick={() => setNewMsg(inputRef.current?.value)}>
        <FaTelegramPlane style={{fill: `${theme?.theme.color}`}} />
      </button>
    </form>
  );
}
