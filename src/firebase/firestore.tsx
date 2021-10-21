import {
  getFirestore,
  collection,
  orderBy,
  limit,
  query,
  addDoc,
  getDocs,
  serverTimestamp,
  doc

} from "firebase/firestore";
// import { app } from "./firebase";



const db = getFirestore();
const messagesRef = collection(db, "messages");

export { orderBy, limit, query, messagesRef,doc,  getDocs, addDoc, serverTimestamp
};
