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
      imgUrl &&
        await updateProfile(user, {
          // update the currently signed user with correnspondent uploaded image.
          photoURL: imgUrl,
        });
      return;
    } catch (error: any) {
      const errorCode = error.code;
      console.log("inside signup hook error code: ", errorCode);
    return errorCode;
    }
  }
}
