import { EMAIL, PASSWORD, PHOTO, InputTypes } from "../../../interfaces/Actions";
import { State } from "../../../interfaces/State";
import { Action } from "../../../interfaces/Actions";

type InputReducer = <S extends State, Act extends Action>(
  state: S,
  action: Act
) => S;
type Reducer<T> = {
  [key in InputTypes]: T
} 
export const inputReducer: InputReducer = function reducer(state, action) {
  const reducer: Reducer<typeof state> = {
    [EMAIL]: { ...state, [EMAIL]: action.payload },
    [PASSWORD]: { ...state, [PASSWORD]: action.payload },
    [PHOTO]: { ...state, [PHOTO]: action.payload },
  };

  return reducer[action.type as keyof typeof reducer] ?? state;
};
