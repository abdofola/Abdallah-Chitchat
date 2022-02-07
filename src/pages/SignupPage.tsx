import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Container } from "react-bootstrap";
import UploadFile from "../component/UploadFile";
import useFirebaseDownload from "../features/helpers/custom_hooks/useFirebaseDownload";
import useFirebaseSignup from "../features/helpers/custom_hooks/useFirebaseSignup";
import useFirebaseUpload from "../features/helpers/custom_hooks/useFirebaseUpload";
import { inputReducer } from "../features/helpers/reducers/inputReducer";
import {
  actionCreator,
  EMAIL,
  PASSWORD,
  Payload,
  SignupActionTypes,
} from "../interfaces/Actions";
import { State } from "../interfaces/State";
import { AiFillMail, AiFillLock } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  EMAIL_ERROR,
  ErrorActionTypes,
  errorReducer,
  PASSWORD_ERROR,
} from "../features/helpers/reducers/errorReducer";
import useCustomFormValidation from "../features/helpers/custom_hooks/useCustomFormValidation";

const initialState: State = {
  email: "",
  password: "",
  photoFile: null,
};
export const initialErrorState = {
  emailError: "",
  passwordError: "",
};

export default function Signup() {
  const [btnMessage, setBtnMessage] = useState("sign up");

  const [progress, setProgress] = useState(0);
  const [state, dispatch] = useReducer(inputReducer, initialState);
  const [errorState, dispatchedError] = useReducer(
    errorReducer,
    initialErrorState
  );
  const { emptinessCheck, validationCheck } = useCustomFormValidation();
  const imgFile = useFirebaseUpload();
  const firebaseDownload = useFirebaseDownload();
  const firebaseSignup = useFirebaseSignup();

  // side effect to perform cleanup.
  useEffect(function sideEffect() {
    return cleanup;
    function cleanup() {
      console.log("component unmount");
    }
  }, []);

  // handlers
  const handleInputChange = function (
    e: ChangeEvent<HTMLInputElement>,
    actionType: SignupActionTypes
  ) {
    const elem = e.target;
    let payLoad: Payload;

    if (actionType === "photoFile" && elem.files) {
      payLoad = elem.files[0];
      return dispatch(actionCreator(actionType, payLoad));
    }

    payLoad = elem.value;
    dispatch(actionCreator(actionType, payLoad));
  };

  const handleBlur = function (
    e: FocusEvent<HTMLInputElement>,
    actionType: ErrorActionTypes
  ) {
    const {
      target: { value },
    } = e;
    const field = actionType.split("E")[0]; // returns either emailError or passwordError
    const fields = emptinessCheck({
      [EMAIL]: "",
      [PASSWORD]: "",
      [field]: value,
    });
    const fieldMessageError = fields[field];
    dispatchedError(actionCreator(actionType, fieldMessageError));
    if (!fieldMessageError) {
      const fieldsValidation = validationCheck({
        [EMAIL]: "",
        [PASSWORD]: "",
        [field]: value,
      });
      dispatchedError(actionCreator(actionType, fieldsValidation[field]));
    }
  };

  const handleSubmit = async function (e: FormEvent) {
    e.preventDefault();
    const RequiredFieldsNotEmpty =
      Boolean(state.email) && Boolean(state.password);
    // console.log("%cstate", "background:lightblue", state);

    if (!RequiredFieldsNotEmpty) {
      // TEST REQUIRED FIELD NOT EMPTY FAILS
      const { email, password } = emptinessCheck({
        [EMAIL]: state[EMAIL],
        [PASSWORD]: state[PASSWORD],
      });
      dispatchedError(actionCreator(EMAIL_ERROR, email));
      dispatchedError(actionCreator(PASSWORD_ERROR, password));

      return;
    }

    const { email, password } = validationCheck({
      [EMAIL]: state[EMAIL],
      [PASSWORD]: state[PASSWORD],
    });
    const invalidFields = Boolean(email) || Boolean(password);

    if (invalidFields) {
      dispatchedError(actionCreator(EMAIL_ERROR, email));
      dispatchedError(actionCreator(PASSWORD_ERROR, password));
      return;
    }
    
    setBtnMessage("wait ...");

    // TEST INVALID FIELDS PASSES
    if (state.photoFile) {
      await imgFile.upload(state.photoFile, setProgress);
      const url = await firebaseDownload.download(state.photoFile.name);
      firebaseSignup
        .signup(state.email, state.password, url)
        .then((errorCode) => {
          setBtnMessage("sign in");
          console.log("error inside component", errorCode);
          dispatchedError(actionCreator(EMAIL_ERROR, errorCode));
        });
      return;
    }
    firebaseSignup.signup(state.email, state.password).then((errorCode) => {
      setBtnMessage("sign in");
      console.log("error inside component", errorCode);
      dispatchedError(actionCreator(EMAIL_ERROR, errorCode));
    });
  };

  return (
    <div className="wrapper">
      <Container>
        <form className="form form--signup" onSubmit={handleSubmit}>
          <h2 className="form__title">Sign up</h2>
          <div className="form__box">
            <label>Email</label>
            <div className="box">
              <div className="icon">
                <AiFillMail />
              </div>
              <input
                className="SignupForm__input"
                value={state.email}
                placeholder="someone@example.com"
                onChange={(e) => handleInputChange(e, EMAIL)}
                onBlur={(e) => handleBlur(e, EMAIL_ERROR)}
              />
            </div>
            <span className="error"> {errorState.emailError} </span>
          </div>
          <div className="form__box">
            <label>Password</label>
            <div className="box">
              <div className="icon">
                <AiFillLock />
              </div>
              <input
                className="SignupForm__input"
                type="password"
                value={state.password}
                onChange={(e) => handleInputChange(e, PASSWORD)}
                onBlur={(e) => handleBlur(e, PASSWORD_ERROR)}
              />
            </div>
            <span className="error"> {errorState.passwordError} </span>
          </div>
          <UploadFile
            handleInput={handleInputChange}
            file={state.photoFile}
            progress={progress}
          />
          <button className="form__btn form--signBtn ">{btnMessage}</button>
          <p className="pale-para">
            {" "}
            Already have an account! <Link to="/">sign in</Link>{" "}
          </p>
        </form>
      </Container>
    </div>
  );
}
