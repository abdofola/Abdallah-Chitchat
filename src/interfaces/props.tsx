type SetStateType = React.Dispatch<React.SetStateAction<number>>;

export interface StateProps  {
  [key: string]: SetStateType;
};