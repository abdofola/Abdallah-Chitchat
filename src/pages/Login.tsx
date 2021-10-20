import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "@firebase/auth";
import { useHistory } from "react-router";
import signInWithPopup, { auth } from "../firebase/firebase";

type Provider = GoogleAuthProvider | GithubAuthProvider | FacebookAuthProvider;

export default function Login() {
  const history = useHistory();

  const handleSignIn = async (provider: Provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      history.push("/chat");
      // console.log("user", user);
      return user;
    } catch (error: any) {
      // Handle Errors here.
      
      const errorMessage = error.message;
      console.log("err msg:", errorMessage);
      const email = error.email;
      console.log('email',email)
      // const credentials = GithubAuthProvider.credentialFromError(error);
      // console.log('credenials',credentials)
      return error;
    }
  };

  return (
    <div className="Login">
      <h1>fola chit chat</h1>
      <button
        className="btn google"
        onClick={() => handleSignIn(new GoogleAuthProvider())}
      >
        login with google
      </button>
      <button
        className="btn facebook"
        onClick={() => handleSignIn(new FacebookAuthProvider())}
      >
        login with facebook
      </button>
      <button
        className="btn github"
        onClick={() => handleSignIn(new GithubAuthProvider())}
      >
        login with github
      </button>
    </div>
  );
}
