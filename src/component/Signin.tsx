import {
  ChangeEvent,
  FormEvent,
  FocusEvent,
  useReducer,
  ReactNode,
  useState,
} from "react";
import {
  actionCreator,
  EMAIL,
  PASSWORD,
  SignupActionTypes,
} from "../interfaces/Actions";
import { inputReducer } from "../features/helpers/reducers/inputReducer";
import {
  EMAIL_ERROR,
  ErrorActionTypes,
  errorReducer,
  PASSWORD_ERROR,
} from "../features/helpers/reducers/errorReducer";

import { State } from "../interfaces/State";
import useFirebaseSignin from "../features/helpers/custom_hooks/useFirebaseSignin";
import { AiFillMail, AiFillLock } from "react-icons/ai";
import { FacebookAuthProvider, GoogleAuthProvider } from "@firebase/auth";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import SignButton from "../component/SignButton";
import { useAuth, UserContext } from "../features/contexts/AuthContext";
import { SetStateType } from "../interfaces/props";
import { Link } from "react-router-dom";
import { initialErrorState } from "../pages/SignupPage";
import useCustomFormValidation from "../features/helpers/custom_hooks/useCustomFormValidation";

type Icon = {
  [key: string]: ReactNode;
};

const ICONS: Icon = {
  google: <FcGoogle />,
  facebook: <FaFacebook />,
  github: <FaGithub />,
};

const providers = {
  google: new GoogleAuthProvider(),
  facebook: new FacebookAuthProvider(),
};

const initialState: State = {
  email: "",
  password: "",
};

export default function Signin() {
  const [btnMessage, setBtnMessage] = useState("sign in");
  const [state, dispatch] = useReducer(inputReducer, initialState);
  const [errorState, dispatchedError] = useReducer(
    errorReducer,
    initialErrorState
  );
  const { emptinessCheck, validationCheck } = useCustomFormValidation();

  const firebase = useFirebaseSignin();
  const buttons = Object.entries(providers).map(([name, provider]) => (
    <SignButton key={name} name={name} provider={provider}>
      {ICONS[name]}
      <span className="text">{`sign in with ${name}`}</span>
    </SignButton>
  ));
  let setAuthenticated: SetStateType<boolean>;
  const user: UserContext | null = useAuth();

  if (user != null) {
    // check if usercontext isn't null; to perform destructuring.
    ({ setAuthenticated } = user);
  }
  // handlers
  const handleInputChange = function (
    e: ChangeEvent<HTMLInputElement>,
    actionType: SignupActionTypes
  ) {
    const {
      target: { value },
    } = e;
    dispatch(actionCreator(actionType, value));
  };

  const handleBlur = function (
    e: FocusEvent<HTMLInputElement>,
    actionType: ErrorActionTypes
  ) {
    const {
      target: { value },
    } = e;
    const field = actionType.split("E")[0]; // returns either emailError or passwordError
    const fields = emptinessCheck({ email: "", password: "", [field]: value });
    const fieldMessageError = fields[field];
    dispatchedError(actionCreator(actionType, fieldMessageError));
    console.log(
      "%ctest field emptiness",
      "background:black;color:white",
      fieldMessageError
    );
    if (!fieldMessageError) {
      const fieldsValidation = validationCheck({
        email: "",
        password: "",
        [field]: value,
      }); // returns validation error message if any, or nothing.
      dispatchedError(actionCreator(actionType, fieldsValidation[field]));
    }
  };

  const handleSubmit = async function (e: FormEvent) {
    e.preventDefault();
    const RequiredFieldsNotEmpty =
      Boolean(state.email) && Boolean(state.password);

    if (!RequiredFieldsNotEmpty) {
      // TEST REQUIRED FIELDS NOT EMPTY FAILS

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
    // TEST FIELDS VALIDITY PASSES
    firebase.signin(state.email, state.password).then((errorCode) => {
      console.log("error code in sign in", errorCode);
      if (errorCode) setBtnMessage("sign in");
      dispatchedError(actionCreator(EMAIL_ERROR, errorCode));
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">Sign in</h2>
      <div className="form__box form__box--min">
        <label>Email</label>
        <div className="box">
          <div className="icon">
            <AiFillMail />
          </div>
          <input
            className="SignupForm__input "
            value={state.email}
            placeholder="someone@example.com"
            onChange={(e) => handleInputChange(e, EMAIL)}
            onBlur={(e) => handleBlur(e, EMAIL_ERROR)}
          />
        </div>
        <span className="error"> {errorState.emailError} </span>
      </div>
      <div className="form__box form__box--min">
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
      <button className="form__btn form--signBtn">{btnMessage}</button>

      <div className="divider">
        <span className="pale-para">or</span>
      </div>
      <div className="form__providers">{buttons}</div>
      <div className="form__footer">
        <p className="pale-para">
          Want to take a quick peek! no worries you can easily{" "}
          <button className="try" onClick={() => setAuthenticated(true)}>
            try the app
          </button>
          . But I encourage you to sign in first if you already have an acount,
          or you can <Link to="/signup">signup</Link> just at the touch of a
          button.
        </p>
      </div>
    </form>
  );
}
