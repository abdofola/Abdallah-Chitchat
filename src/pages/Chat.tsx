import { useState, useEffect, useRef } from "react";
import { messagesRef, orderBy, query } from "../firebase/firestore";
import { DocumentData, onSnapshot } from "@firebase/firestore";
import ChatMessage from "../component/ChatMessage";
import Nav from "../component/Nav";
import Form from "../component/MessageForm";
import { useThemeContext } from "../features/contexts/themeContext";
import { usePopupContext } from "../features/contexts/PopupContext";
import Popup from "../component/Popup";

export default function Chat() {
  const ref = useRef<HTMLDivElement>(null);
  const theme = useThemeContext();
  const popup = usePopupContext();
  const [navHeight, setNavHeight] = useState(0);
  const [formHeight, setFormHeight] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<DocumentData[] | null>(null);
  const paddingBlock = {
    paddingBlockStart: `${navHeight}px`,
    paddingBlockEnd: `${formHeight}px`,
  };
  let showPopup: boolean = false;

  if (popup) {
    [showPopup] = popup;
  }

  // side effect to render loading indicator and messages when component first mounts.
  useEffect(() => {
    function scrollToLastMessage() {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }

    setLoading(true);
    const q = query(messagesRef, orderBy("createdAt")); // query accepts another argument as limit
    onSnapshot(q, (querySnapshot) => {
      setMessages(querySnapshot.docs);
      setLoading(false);
      scrollToLastMessage();
    });

  }, []);

  return (
    <>
      {showPopup && <Popup />}
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
    </>
  );
}
