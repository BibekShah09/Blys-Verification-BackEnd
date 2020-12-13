import { StatusCodes, getStatusText } from 'http-status-codes';

const buildError = (err: any) => {
  if (err.isJoi) {
    return {
      code: StatusCodes.BAD_REQUEST,
      message: getStatusText(StatusCodes.BAD_REQUEST),
      details:
          err.details &&
          err.details.map((error: any) => {
            return {
              message: error.message,
              param: error.path.join('.'),
            };
          }),
    };
  }

  // HTTP errors
  if (err.isBoom) {
    return {
      code: err.output.statusCode,
      message: err.output.payload.message || err.output.payload.error,
    };
  }

  // Return INTERNAL_SERVER_ERROR for all other cases
  return {
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    message: getStatusText(StatusCodes.INTERNAL_SERVER_ERROR),
  };
};

export default buildError;
