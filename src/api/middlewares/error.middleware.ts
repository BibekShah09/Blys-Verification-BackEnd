import { NextFunction, Request, Response } from 'express';
import { StatusCodes, getStatusText } from 'http-status-codes';
import { buildError, logger } from '../utils';
// import buildError from '../utils/buildError';
import HttpException from '../exceptions/HttpException';

/**
 * Error middleware for 404 not found
 * @param req
 * @param res
 */
const notFound = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND)
      .json({
        error: {
          code: StatusCodes.NOT_FOUND,
          message: getStatusText(StatusCodes.NOT_FOUND),
        },
      });
};

/**
 * Method not allowed error middleware.
 * @param req
 * @param res
 */
const methodNotAllowed  = (req: Request, res: Response) => {
  res.status(StatusCodes.METHOD_NOT_ALLOWED)
      .json({
        error: {
          code: StatusCodes.METHOD_NOT_ALLOWED,
          message: getStatusText(StatusCodes.METHOD_NOT_ALLOWED),
        },
      });
};

/**
 * To handle errors from body parser for cases such as invalid JSON sent through
 * the body (https://github.com/expressjs/body-parser#errors)
 * @param err
 * @param req
 * @param res
 */
const bodyParser = (err: HttpException, req: Request, res: Response) => {
  logger.error(err.message);

  res.status(err.status).json({
    error: {
      code: err.status,
      message: getStatusText(err.status),
    },
  });
};

/**
 * Generic error response middleware for validation and internal server errors.
 * @param err
 * @param req
 * @param res
 * @param next
 */
const genericErrorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  const error = buildError(err);

  res.status(error.code).json({ error });
};

export { notFound, methodNotAllowed, bodyParser, genericErrorHandler };
