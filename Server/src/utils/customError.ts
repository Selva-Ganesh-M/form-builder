export class customError extends Error {
  public devMessage: string;
  public statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message.split(":")[1].trim());
    this.statusCode = statusCode;
    this.devMessage = message;
  }
}
