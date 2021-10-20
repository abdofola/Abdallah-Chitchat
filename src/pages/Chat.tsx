import { useState, useRef, useEffect, } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signOut } from "../firebase/firebase";
import { useAuth } from "../contexts/AuthContext";
import {
  serverTimestamp,
  messagesRef,
  orderBy,
  query,
  limit,
  getDocs,
  addDoc,
} from "../firebase/firestore";
import { DocumentData } from "@firebase/firestore";
import ChatMessage from "../component/ChatMessage";

export default function Chat() {
  const dummyRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string>("");
  const [newMsg, setNewMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const [messages, setMessages] = useState<DocumentData[] | null>(null);
  const history = useHistory();
  const user = useAuth();

  useEffect(() => {
    const q = query(messagesRef, orderBy("createdAt"), limit(25));

    async function readDocs() {
      setLoading(true);
      setErr(false);
      try {
        const snapshot = await getDocs(q);
        setMessages(snapshot.docs);
      } catch (error) {
        setErr(true);
        console.log("error", error);
      }
      setLoading(false);
    }
    readDocs();
  }, [newMsg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(messagesRef, {
      text: newMsg,
      createdAt: serverTimestamp(),
      uid: user?.uid,
    });

    dummyRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    setValue("");
    setNewMsg("");
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
            {err && <h2> There's somthing wrong please refresh .. </h2>}
            {loading ? (
              <h2>Loading ..</h2>
            ) : (
              messages?.map((message, idx) => (
                <ChatMessage key={idx} msg={message.data()} />
              ))
            )}
            <div ref={dummyRef}></div>
          </section>
          <form onSubmit={handleSubmit}>
            <input
              value={value}
              type="text"
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              type="submit"
              disabled={!value}
              onClick={() => setNewMsg(value)}
            >
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
