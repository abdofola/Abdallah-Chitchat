import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

export interface IFirebase {
  auth: any;
  facebookProvider: FacebookAuthProvider;
  googleProvider: GoogleAuthProvider;
  onAuthStateChanged: Function;
  signOut: Function;
}
