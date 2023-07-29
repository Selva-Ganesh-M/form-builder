export interface IMcq<T> {
  question: string;
  options: Array<T>;
  answer: T;
}

export interface IWDMcq<T> extends Partial<IMcq<T>> {
  question: string;
  options: Array<T>;
}
