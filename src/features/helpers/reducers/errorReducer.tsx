export const EMAIL_ERROR = "emailError";
export const PASSWORD_ERROR = "passwordError";

export type ErrorActionTypes = typeof EMAIL_ERROR | typeof PASSWORD_ERROR;

type State = {
  [key in ErrorActionTypes]: string;
};

type Action = {
  type: ErrorActionTypes;
  payload: string;
};

type ErrorReducer = (state: State, action: Action) => State;

const errorReducer: ErrorReducer = function reducer(state, action) {
  const reducer = {
    [EMAIL_ERROR]: { ...state, [EMAIL_ERROR]: action.payload },
    [PASSWORD_ERROR]: { ...state, [PASSWORD_ERROR]: action.payload },
  };
  return reducer[action.type as keyof typeof reducer] ?? state;
};

export { errorReducer };
