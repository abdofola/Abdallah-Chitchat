import { EMAIL_ERROR, PASSWORD_ERROR } from "./reducers/errorReducer";

type ValidationRule = (value: string) => boolean;
type Validator = (value: string) => string | void;
type Composer = (rule: ValidationRule, msg: string) => Validator;

// Rules
const validateRequired: ValidationRule = (value) => value.length > 0;

const validateEmail: ValidationRule = (email) =>
  email.indexOf("@") !== -1 &&
  email.indexOf("@") !== 0 &&
  email.indexOf("@") !== email.length - 1;

const validateMinPassword: ValidationRule = (password) => password.length >= 6;

const composeValidator: Composer = function compose(rule, msg) {
  return function (value) {
    if (!rule(value)) return msg;
  };
};

// API
export const isRequired = function (field: string) {
  const msg = `you forgot your ${field}, Sir`;
  return composeValidator(validateRequired, msg);
};

export const isEmail = function (msg = "please enter a valid email, Sir") {
  return composeValidator(validateEmail, msg);
};

export const isMinPassword = function (
  msg = "password is less than 6 characters, Sir"
) {
  return composeValidator(validateMinPassword, msg);
};

export const rules = {
  [EMAIL_ERROR]: isEmail(),
  [PASSWORD_ERROR]: isMinPassword(),
};
