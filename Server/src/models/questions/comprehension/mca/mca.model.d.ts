export interface IMca<T> {
  question: string;
  options: Array<T>;
  answers: Array<T>;
}

export interface IWDMca<T> extends Partial<IMca<T>> {
  question: string;
  options: Array<T>;
}
