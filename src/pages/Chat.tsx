import { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signOut } from "../firebase/firebase";
import { useAuth } from "../contexts/AuthContext";
import {
  serverTimestamp,
  messagesRef,
  orderBy,
  query,
  limit,
  addDoc,
} from "../firebase/firestore";
import { DocumentData, onSnapshot } from "@firebase/firestore";
import ChatMessage from "../component/ChatMessage";

export default function Chat() {
  const [newMsg, setNewMsg] = useState<string>();
  const dummyRef = useRef<HTMLDivElement | null>(null);
  const valueRef = useRef<HTMLInputElement | null>(null);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [err, setErr] = useState<boolean>(false);
  const [messages, setMessages] = useState<DocumentData[] | null>(null);
  const history = useHistory();
  const user = useAuth();

  useEffect(() => {
    const q = query(messagesRef, orderBy("createdAt"), limit(25));

    onSnapshot(q, (querySnapshot) => {
      setMessages(querySnapshot.docs);
    });
  }, [newMsg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newValue = valueRef.current?.value;
    if (valueRef.current) {
      setNewMsg(newValue); // is not working, & I dont know why
      // console.log("ref message", newValue);
      // console.log({ newMsg });
      valueRef.current.value = "";
    }

    try {
      if (!newValue) return;
      await addDoc(messagesRef, {
        text: newValue,
        createdAt: serverTimestamp(),
        uid: user?.uid,
      });
    } catch (error) {
      console.log(error);
    }

    dummyRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      history.push("/");
    } catch (error: unknown) {
      console.log("error from Chat:", error);
    }
  };

  return (
    <>
      {user ? (
        <div className="Chatroom">
          <nav>
            <h2>Folachat</h2>
            <button onClick={handleLogout}>Logout</button>
          </nav>
          <section className="Chatroom__log">
            {messages?.map((message, idx) => (
              <ChatMessage key={idx} msg={message.data()} />
            ))}

            <div ref={dummyRef}></div>
          </section>
          <form>
            <input ref={valueRef} type="text" />
            <button type="submit" onClick={handleSubmit}>
              send
            </button>
          </form>
        </div>
      ) : (
        <div>
          Sorry you need <Link to="/">sign in</Link> first.
        </div>
      )}
    </>
  );
}
