import { Button, Modal } from "react-bootstrap";
import { usePopupContext } from "../contexts/PopupContext";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { SetStateType } from "../interfaces/props";

type toggler = () => void;

export default function Popup() {
  const user = useAuth();
  const popup = usePopupContext();
  const history = useHistory();
  let showPopup: boolean = false;
  let handleClose: toggler = () => {};
  let handleShow: toggler = () => {};
  let setAuthenticated: SetStateType<boolean>;

  if (popup && user) {
    ({ setAuthenticated } = user);
    [showPopup, handleClose, handleShow] = popup;
  }

  // handlers
  const redirectToSignin = function () {
    handleClose();
    setAuthenticated(false);
    history.push("/");
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={showPopup} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chat App</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Ooh, sorry you need to be a user to start texting!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={redirectToSignin}>
            Signin
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Signup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
