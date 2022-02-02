export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export interface StateProps<T> {
  [key: string]: SetStateType<T>;
}
