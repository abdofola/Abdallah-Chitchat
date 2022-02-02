import React, { ReactNode, useContext } from "react";

type Togglers = (()=> void)[]
type PopupCxt = [ boolean, ...Togglers];

type PopupProps = {
  children: ReactNode;
};

const PopupContext = React.createContext<PopupCxt | null>(null);

export function usePopupContext() {
  return useContext(PopupContext);
}
export default function PopupProvider({ children }: PopupProps) {
  const [showPopup, setShowPopup] = React.useState(false);

  function handleShow() {
    setShowPopup(true);
  }
  function handleClose(){
    setShowPopup(false)
  }
  const popup: PopupCxt = [showPopup, handleClose, handleShow];

  return (
    <PopupContext.Provider value={popup}>{children}</PopupContext.Provider>
  );
}
