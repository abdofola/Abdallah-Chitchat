import { FaCloudUploadAlt, FaFileDownload } from "react-icons/fa";
import { ChangeEvent, useEffect, useRef } from "react";
import { SignupActionTypes, PHOTO } from "../interfaces/Actions";

type UploadFileProps = {
  file: any;
  progress: number;
  handleInput: (
    e: ChangeEvent<HTMLInputElement>,
    actionType: SignupActionTypes
  ) => void;
};

export default function UploadFile({
  file,
  progress,
  handleInput,
}: UploadFileProps) {
  const ref = useRef<HTMLInputElement | null>(null);

  // side effect to perform clean up of the file reference.
  useEffect(function sideEffect() {
    return function cleanup() {
      ref.current = null;
    };
  }, []);

  return (
    <div className="upload">
      <h4 className="upload__title">Upload your file</h4>
      <p className="pale-para">file should be an image</p>
      <div className="upload__dropZone" >
        {!file ? (
          <div className="caption ">
            <FaCloudUploadAlt />
            <p className="pale-para">Click to browse</p>
          </div>
        ) : (
          <img src={URL.createObjectURL(file)} alt="upload img" />
        )}
        <input
          ref={ref}
          type="file"
          accept="image/*"
          onChange={(e) => handleInput(e, PHOTO)}
        />
      </div>
      {file && (
        <div className="upload__file-uploaded">
          <p className="pale-para">Uploaded file</p>
          <div className="details">
            <FaFileDownload />
            <div className="details__wrapper">
              <span>{file.name}</span>
              <span className="progress">
                <span style={{ width: progress + "%" }} />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
