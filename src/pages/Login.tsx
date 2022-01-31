import {
  FacebookAuthProvider,
    GoogleAuthProvider,
} from "@firebase/auth";
import { ReactNode } from "react";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import SignButton from "../component/SignButton";

type Icon = {
  [key: string]: ReactNode;
};

const providers = {
  google: new GoogleAuthProvider(),
  facebook: new FacebookAuthProvider(),
};

const ICONS: Icon = {
  google: <FcGoogle />,
  facebook: <FaFacebook />,
  github: <FaGithub />,
};

export default function Login() {
  const buttons = Object.entries(providers).map(([name, provider]) => (
    <SignButton key={name} name={name} provider={provider}>
      {ICONS[name]}
     <span>{`sign in with ${name}`}</span> 
    </SignButton>
  ));

  return (
    <div className="Login">
      <h1>fola chitchat</h1>
      {buttons}
    </div>
  );
}
