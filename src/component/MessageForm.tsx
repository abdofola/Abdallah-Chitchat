import * as React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useThemeContext } from "../contexts/themeContext";
import { useHeight } from "../custom_hooks/useHeight";
import { addDoc, serverTimestamp, messagesRef } from "../firebase/firestore";
import { StateProps } from "../interfaces/props";
import { FaTelegramPlane } from "react-icons/fa";
import { User } from "../interfaces/User";
import { usePopupContext } from "../contexts/PopupContext";

export default function Form({ setFormHeight }: StateProps<number>) {
  const user = useAuth();
  const theme = useThemeContext();
  const popup = usePopupContext();
  const [newMsg, setNewMsg] = React.useState<string>();
  const [canSave, setCanSave] = React.useState(false);
  const [ref, getHeight] = useHeight<HTMLFormElement>();
  let info: User | null;

  if (user != null) {
    ({ info } = user);
  }
  //   sideEffect to set the form height when component renders
  React.useEffect(() => {
    setFormHeight(getHeight());
  }, [getHeight, setFormHeight]);

  // handlers
  const handleMessageChange = (e: React.ChangeEvent) => {
    const elem = e.target as HTMLTextAreaElement;
    setNewMsg(elem.value);
    setCanSave(Boolean(info) && Boolean(elem.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (canSave) {
        console.log(" message state is updated");
        return await addDoc(messagesRef, {
          text: newMsg,
          createdAt: serverTimestamp(),
          uid: user?.info?.uid,
          photoURL: user?.info?.photoURL,
        });
      }

      console.log("message state is not updated yet!");
    } catch (error) {
      console.log("error", error);
    }

    setNewMsg("");
  };

  const handlePopup = function () {
    if (!info) {
      let handleShow: () => void;
      if (popup) {
        ({2: handleShow} = popup);
        handleShow();
      }
      console.log("%cthis is demo user", "background:coral");
    }
  };

  return (
    <form
      ref={ref}
      className={`App-theme-${theme?.themeAlias}`}
      onSubmit={handleSubmit}
    >
      <textarea
        className={`${theme?.themeAlias}`}
        placeholder="Enter your message ..."
        value={newMsg}
        onChange={handleMessageChange}
      />
      <button onClick={handlePopup}>
        <FaTelegramPlane style={{ fill: `${theme?.theme.color}` }} />
      </button>
    </form>
  );
}
