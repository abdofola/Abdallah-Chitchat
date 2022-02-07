import { ErrorActionTypes } from "../features/helpers/reducers/errorReducer";

export const EMAIL = "email";
export const PASSWORD = "password";
export const PHOTO = "photoFile";

export type SignupActionTypes = typeof EMAIL | typeof PASSWORD | typeof PHOTO;
export type ActionTypes = SignupActionTypes | ErrorActionTypes;
export type Payload = null | void | string | File;

export interface Action {
  type: ActionTypes;
  payload: Payload;
}

// TODO: fix the issue of actionCreator returned type.
type ActionCreator = (actionType: ActionTypes, actionPayload: Payload) => any;

export const actionCreator: ActionCreator = function (actionType, payload) {
  return { type: actionType, payload };
};
