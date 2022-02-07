import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function useFirebaseSignin() {
  const auth = getAuth();

  return { signin };

  async function signin(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password); // returns userCredentials.
      return console.log("successfuly signed in");
    } catch (error: any) {
      return error.code;
    }
  }
}
