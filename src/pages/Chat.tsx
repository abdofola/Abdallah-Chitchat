import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { messagesRef, orderBy, query } from "../firebase/firestore";
import { DocumentData, onSnapshot } from "@firebase/firestore";
import ChatMessage from "../component/ChatMessage";
import { useScroll } from "../custom_hooks/useScroll";
import Nav from "../component/Nav";
import Form from "../component/Form";
import { useThemeContext } from "../contexts/themeContext";

export default function Chat() {
  const [navHeight, setNavHeight] = useState(0);
  const [formHeight, setFormHeight] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<DocumentData[] | null>([]);
  const user = useAuth();
  const theme = useThemeContext();
  const [ref, executeScroll] = useScroll();
  const paddingBlock = {
    paddingBlockStart: `${navHeight}px`,
    paddingBlockEnd: `${formHeight}px`,
  };

  // side effect to render loading indicator and messages when component first mounts.
  useEffect(() => {
    // console.log("on mount");
    setLoading(true);
    const q = query(messagesRef, orderBy("createdAt")); // query accepts another argument as limit
    onSnapshot(q, (querySnapshot) => {
      setMessages(querySnapshot.docs);
      setLoading(false);
    });
  }, []);

  // side effect to scroll the window to the last message when first component renders & on each new message.
  useEffect(executeScroll);

  return (
    <>
      {user ? (
        <div className={`Chatroom App-theme-${theme?.themeAlias}`}>
          <Nav setNavHeight={setNavHeight} />
          <section className="Chatroom__log" style={paddingBlock}>
            {loading ? (
              <h1 className="loading">Loading ...</h1>
            ) : (
              messages?.map((message, idx) => (
                <ChatMessage key={idx} msg={message.data()} />
              ))
            )}
            <div ref={ref} className="dummy"></div>
          </section>
          <Form setFormHeight={setFormHeight} />
        </div>
      ) : (
        <h3 style={{ textAlign: "center", paddingTop: "5rem" }}>
          Sorry you need to <Link to="/">sign in</Link> first.
        </h3>
      )}
    </>
  );
}
