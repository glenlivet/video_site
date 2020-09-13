/**
 * A more general HTTP request exception.
 */
export class GeneralHttpException extends Error {
  constructor(public code: number, public message: string) {
    super(message);
  }
}
