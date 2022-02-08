import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
} from "firebase/storage";
import { SetStateType } from "../../../interfaces/props";

export default function useFirebaseUpload() {
  const storage = getStorage();

  const handleFailure = function (error: StorageError) {
    switch (error.code) {
      case "storage/unauthorized":
        console.log("User doesn't have permission to access the object");
        break;
      case "storage/canceled":
        console.log(" User canceled the upload");
        break;
      case "storage/unknown":
        console.log("Unknown error occurred, inspect error.serverResponse");
        break;
    }
  };

  return { upload };

  async function upload(
    file: File,
    setProgress: SetStateType<number>,
    setImgUrl: SetStateType<string>
  ) {
    // console.log("%cfile inside upload", "background:green;color:white", file);

    const metadata = {
      contentType: file.type,
    };
    // Upload file and metadata to the object 'images/${file.name}'
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgress(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      handleFailure,
      function handleSuccess() {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgUrl(url);
        });
      }
    );
  }
}
