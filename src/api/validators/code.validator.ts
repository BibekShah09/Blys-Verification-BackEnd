import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import validate from '../utils/validate';

const CODE_VALIDATION_SCHEMA = Joi.object({
  code: Joi.number()
      .integer()
      .label('Code')
      .required(),
});

const codeVerificationValidator = (req: Request, res: Response, next: NextFunction) => {
  return validate(req.body, CODE_VALIDATION_SCHEMA)
      .then(() => next())
      .catch((err: Error) => next(err));
};

export default codeVerificationValidator;
