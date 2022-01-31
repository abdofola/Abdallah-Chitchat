import { useHistory } from "react-router-dom";
import signInWithPopup, { auth } from "../firebase/firebase";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "@firebase/auth";
import { ReactNode } from "react";

type Provider = GoogleAuthProvider | FacebookAuthProvider;

type SignButtonProps = {
    name: string,
  provider: Provider;
  children: Array<ReactNode>;
};

export default function SignButton({ children, provider, name }: SignButtonProps) {
  const history = useHistory();

  const handleSignIn = async (provider: Provider) => {
    try {
      await signInWithPopup(auth, provider); // returns the result containing user info
      history.push("/chat");
    } catch (error: any) {
      // Handle Errors here.
      const errorMessage = error.message;
      const email = error.email;
      console.log("err msg:", errorMessage);
      console.log("email", email);
    }
  };

  return <button name={name} onClick={() => handleSignIn(provider)}>{children}</button>;
}
