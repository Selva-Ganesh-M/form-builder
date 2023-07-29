export interface ICompQ {
  question: String;
  image: String;
  compQuestions: Array<{
    questionType: String;
    _id: String;
  }>;
}
