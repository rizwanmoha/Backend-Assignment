import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError  {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super('Invalid Requests Parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const formattedErrors = this.errors.map((err) => {
      if (err.type === 'field') {
        return { message: err.msg, field: err.path };
      }
      return { message: 'Validation error', field: 'Unknown' };
    });
    return formattedErrors;
  }
}