import { useAuth } from "../../contexts/AuthContext";
import { addDoc, serverTimestamp, messagesRef } from "../../../firebase/firestore";

export default function useAddMessage() {
  const user = useAuth();

  return { add };

  async function add(message: string) {
    try {
      console.log(" message state is updated");
      return await addDoc(messagesRef, {
        text: message,
        createdAt: serverTimestamp(),
        uid: user?.info?.uid,
        photoURL: user?.info?.photoURL,
      });
    } catch (error) {
      console.log("error", error);
    }
  }
}
