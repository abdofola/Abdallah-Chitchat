import { FacebookAuthProvider, GoogleAuthProvider } from "@firebase/auth";
import React, { ReactNode } from "react";
import useFirebaseProvider from "../features/helpers/custom_hooks/useFirebaseProvider";

type Provider = GoogleAuthProvider | FacebookAuthProvider;

type SignButtonProps = {
  name: string;
  provider: Provider;
  children: Array<ReactNode>;
};

export default function SignButton({
  children,
  provider,
  name,
}: SignButtonProps) {
  const firebase = useFirebaseProvider();

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // on success user directly gets redirected to the chatroom
    firebase.signWithProvider(provider);
  };

  return (
    <button className="form__btn" name={name} onClick={handleSignIn}>
      {children}
    </button>
  );
}
