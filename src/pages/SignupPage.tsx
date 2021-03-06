import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  useEffect,
  useReducer,
  useState,
  useRef,
} from "react";
import { Container } from "react-bootstrap";
import UploadFile from "../component/UploadFile";
import useFirebaseSignup from "../features/helpers/custom_hooks/useFirebaseSignup";
import useFirebaseUpload from "../features/helpers/custom_hooks/useFirebaseUpload";
import { inputReducer } from "../features/helpers/reducers/inputReducer";
import {
  actionCreator,
  EMAIL,
  PASSWORD,
  Payload,
  InputTypes,
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
  const emailRef = useRef<HTMLInputElement>(null);
  const pswRef = useRef<HTMLInputElement>(null);

  const [btnMessage, setBtnMessage] = useState("sign up");
  const [canSubmit, setCanSubmit] = useState(true);
  const [imgUrl, setImgUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [state, dispatch] = useReducer(inputReducer, initialState);
  const [errorState, dispatchedError] = useReducer(
    errorReducer,
    initialErrorState
  );
  const { emptinessCheck, validationCheck } = useCustomFormValidation();
  const imgFile = useFirebaseUpload();
  const firebaseSignup = useFirebaseSignup();

  // side effect to set the ablility of submiting the form programaitcally when the file input selected.
  useEffect(
    function sideEffect() {
      // console.log("progress", progress);
      if (state.photoFile) {
        progress === 100 && setCanSubmit(true);
      }
      return function cleanup() {
        // console.log("component unmount");
      };
    },
    [progress, state.photoFile]
  );

  // handlers
  const handleInputChange = async function (
    e: ChangeEvent<HTMLInputElement>,
    actionType: InputTypes
  ) {
    const elem = e.target;
    let payLoad: Payload;

    if (actionType === "photoFile" && elem.files) {
      // console.log("file changes");
      setCanSubmit(false);
      payLoad = elem.files[0];
      dispatch(actionCreator(actionType, payLoad));
      await imgFile.upload(payLoad, setProgress, setImgUrl);
      return;
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
    const field = actionType.split("E")[0]; // returns either email or password
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

    // TEST REQUIRED FIELD NOT EMPTY FAILS
    if (!RequiredFieldsNotEmpty) {
      const { email, password } = emptinessCheck({
        [EMAIL]: state[EMAIL],
        [PASSWORD]: state[PASSWORD],
      });
      dispatchedError(actionCreator(EMAIL_ERROR, email));
      dispatchedError(actionCreator(PASSWORD_ERROR, password));
      email && emailRef.current?.focus();
      !email && pswRef && pswRef.current?.focus();

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
      email && emailRef.current?.focus();
      !email && pswRef && pswRef.current?.focus();
      return;
    }

    setBtnMessage("wait ...");

    // TEST INVALID FIELDS PASSES
    if (state.photoFile) {
      const errorCode = await firebaseSignup.signup(
        state.email,
        state.password,
        imgUrl
      );
      if (errorCode) {
        setBtnMessage("sign in");
        dispatchedError(actionCreator(EMAIL_ERROR, errorCode));
      }
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
                ref={emailRef}
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
                ref={pswRef}
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
          <button className="form__btn form--signBtn " disabled={!canSubmit}>
            {btnMessage}
          </button>
          <p className="pale-para">
            {" "}
            Already have an account! <Link to="/">sign in</Link>{" "}
          </p>
        </form>
      </Container>
    </div>
  );
}
