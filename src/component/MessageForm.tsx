import * as React from "react";
import { useAuth } from "../features/contexts/AuthContext";
import { useThemeContext } from "../features/contexts/themeContext";
import { useHeight } from "../features/helpers/custom_hooks/useHeight";
import { StateProps } from "../interfaces/props";
import { FaTelegramPlane } from "react-icons/fa";
import { User } from "../interfaces/User";
import { usePopupContext } from "../features/contexts/PopupContext";
import useAddMessage from "../features/helpers/custom_hooks/useAddMessage";

export default function Form({ setFormHeight }: StateProps<number>) {
  const user = useAuth();
  const theme = useThemeContext();
  const popup = usePopupContext();
  const [newMsg, setNewMsg] = React.useState<string>();
  const [canSave, setCanSave] = React.useState(false);
  const [ref, getHeight] = useHeight<HTMLFormElement>();
  const firebase = useAddMessage();
  let info: User | null;

  if (user != null) {
    ({ info } = user);
  }
  //   sideEffect to set the form height when component renders
  React.useEffect(() => {
    setFormHeight(getHeight());
  }, [getHeight, setFormHeight]);

  // handlers
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = e;
    setNewMsg(value);
    setCanSave(Boolean(info) && Boolean(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewMsg("");
    if (canSave && newMsg) return firebase.add(newMsg);

    // console.log("message state is not updated yet!");
  };

  const handlePopup = function () {
    if (!info) {
      let handleShow: () => void;
      if (popup) {
        ({ 2: handleShow } = popup);
        handleShow();
      }
      // console.log("%cthis is demo user", "background:coral");
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
      <button className="send" onClick={handlePopup}>
        <FaTelegramPlane style={{ fill: `${theme?.theme.color}` }} />
      </button>
    </form>
  );
}
