import { ErrorActionTypes } from "../features/helpers/reducers/errorReducer";

export const EMAIL = "email";
export const PASSWORD = "password";
export const PHOTO = "photoFile";

export type InputTypes = typeof EMAIL | typeof PASSWORD | typeof PHOTO;
export type ActionTypes = InputTypes | ErrorActionTypes;
export type Payload = null | void | string | File;

export interface Action {
  type: ActionTypes;
  payload: Payload;
}

// TODO: the type of the returned value from actionCreator shouldn't be any. 
type ActionCreator = (actionType: ActionTypes, actionPayload: Payload) => any;

export const actionCreator: ActionCreator = function (actionType, payload) {
  return { type: actionType, payload };
};
