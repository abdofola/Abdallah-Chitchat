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
import { useScroll } from "../custom_hooks/useScroll";

export default function Chat() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navRef = useRef<HTMLFormElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [newMsg, setNewMsg] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<DocumentData[] | null>([]);
  const history = useHistory();
  const user = useAuth();
  const [ref, executeScroll] = useScroll();

  // side effect to render loading indicator and messages when component first mounts.
  useEffect(() => {
    console.log("on mount");
    setLoading(true);
    const q = query(messagesRef, orderBy("createdAt"), limit(25));
    onSnapshot(q, (querySnapshot) => {
      setMessages(querySnapshot.docs);
      setLoading(false);
    });
  }, []);

  // side effect to scroll the window to the last message when first component renders & on each new message.
  useEffect(executeScroll);

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
        });
      }
      console.log("message state is not updated yet!");
    } catch (error) {
      console.log(error);
    }
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
          <nav ref={navRef}>
            <h1>Folachat</h1>
            <button onClick={handleLogout}>Logout</button>
          </nav>
          <section
            className="Chatroom__log"
            style={{
              paddingBlockStart: `${navRef.current?.clientHeight}px`,
              paddingBlockEnd: `${formRef.current?.clientHeight}px`,
            }}
          >
            {loading ? (
              <h1 className="loading">Loading ...</h1>
            ) : (
              messages?.map((message, idx) => (
                <ChatMessage key={idx} msg={message.data()} />
              ))
            )}
            <div ref={ref} className="dummy"></div>
          </section>
          <form ref={formRef} onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter your message"
            />
            <button
              type="submit"
              onClick={() => setNewMsg(inputRef.current?.value)}
            >
              send
            </button>
          </form>
        </div>
      ) : (
        <h3 style={{textAlign: 'center', paddingTop:'5rem'}}>
          Sorry you need to <Link to="/">sign in</Link> first.
        </h3>
      )}
    </>
  );
}
