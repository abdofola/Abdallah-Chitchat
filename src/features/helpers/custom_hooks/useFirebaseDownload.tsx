import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function useFirebaseDownload() {
  const storage = getStorage();

  return { download };

  async function download(fileName: string) {
    try {
      const url = await getDownloadURL(ref(storage, `images/${fileName}`));
      return url;
    } catch (e) {
      console.log("inside download hook", e);
    }
  }
}
