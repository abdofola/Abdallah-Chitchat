import { EMAIL, PASSWORD } from "../../../interfaces/Actions";
import { EMAIL_ERROR, PASSWORD_ERROR } from "../reducers/errorReducer";
import { isRequired, rules } from "../validation";

// TODO: THIS TYPE DOESN'T MAKE ANY SENSE !!!!!
export type Inputs = typeof EMAIL | typeof PASSWORD | string;

type Fields = {
  [key in Inputs]: string;
};

type Checked = {
  [key in Inputs]: string | void;
};

type MakeValidation = (fields: Fields) => Checked;

export default function useCustomFormValidation() {
  const emptinessCheck: MakeValidation = function (fields) {
    const emptyEmailErrMsg = isRequired(EMAIL)(fields[EMAIL]);
    const emptyPasswordErrMsg = isRequired(PASSWORD)(fields[PASSWORD]);

    
    return { email: emptyEmailErrMsg, password: emptyPasswordErrMsg };
  };

  const validationCheck: MakeValidation = function (fields) {
    const invalidEmailErrMsg = rules[EMAIL_ERROR](fields[EMAIL]);
    const invalidPasswordErrMsg = rules[PASSWORD_ERROR](fields[PASSWORD]);
    return { email: invalidEmailErrMsg, password: invalidPasswordErrMsg };
  };

  return { emptinessCheck, validationCheck };
}
