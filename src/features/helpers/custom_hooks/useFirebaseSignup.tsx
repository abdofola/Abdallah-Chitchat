import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function useFirebaseSignup() {
  const auth = getAuth();

  return { signup };

  async function signup(email: string, password: string, imgUrl = "") {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      // update the currently signed user with correnspondent uploaded image.
      await updateProfile(user, {
        photoURL: imgUrl,
      });
      return;
    } catch (error: any) {
      const errorCode:string = error.code;
      console.log("inside signup hook error code: ", errorCode);
      return errorCode;
    }
  }
}
