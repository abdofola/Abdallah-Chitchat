import { FacebookAuthProvider, GoogleAuthProvider } from "@firebase/auth";
import { ReactNode } from "react";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import SignButton from "../component/SignButton";
import { useAuth, UserContext } from "../contexts/AuthContext";
import { SetStateType } from "../interfaces/props";

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
  let setAuthenticated : SetStateType<boolean>;
  const user : UserContext | null = useAuth();

  if(user != null) { // check if usercontext isn't null; to perform destructuring.
    ({setAuthenticated} = user);
  } 

  const buttons = Object.entries(providers).map(([name, provider]) => (
    <SignButton key={name} name={name} provider={provider}>
      {ICONS[name]}
      <span>{`sign in with ${name}`}</span>
    </SignButton>
  ));

  return (
    <div className="Login">
      <h1>fola chitchat</h1>
      <button onClick={()=> setAuthenticated(true)}>try the app</button>
      {buttons}
    </div>
  );
}
