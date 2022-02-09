import { FacebookAuthProvider, GoogleAuthProvider } from "@firebase/auth";
import { useAuth } from "../../contexts/AuthContext";
import signInWithPopup, { auth } from "../../../firebase/firebase";

type Provider = GoogleAuthProvider | FacebookAuthProvider;

export default function useFirebaseProvider() {
  const user = useAuth();
  let success = false;

  async function signWithProvider(provider: Provider) {
    try {
      await signInWithPopup(auth, provider); // returns the result containing user info
      user?.setAuthenticated(true);
      success = true;
    } catch (error: any) {
      // Handle Errors here.
      // const errorMessage = error.message;
      // const email = error.email;
      // console.log("err msg:", errorMessage);
      // console.log("email", email);
    }

    return success;
  }

  return { signWithProvider };
}
