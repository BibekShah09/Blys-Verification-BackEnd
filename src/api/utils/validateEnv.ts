import * as Joi from 'joi';
import logger from './logger';
import validate from './validate';

const TOKEN_VALIDATION_SCHEMA = Joi.object({
  NODE_ENV: Joi.string()
      .label('Node Environment')
      .required(),
  APP_NAME: Joi.string()
      .label('Application Name')
      .required(),
  APP_VERSION: Joi.string()
      .label('Application Version')
      .required(),
  APP_HOST: Joi.string()
      .label('Application HOST')
      .required(),
  APP_PORT: Joi.string()
      .label('Application Port')
      .required(),
});

const { APP_NAME, NODE_ENV, APP_PORT, APP_VERSION, APP_HOST } = process.env;

const data = {
  APP_VERSION,
  APP_HOST,
  APP_PORT,
  APP_NAME,
  NODE_ENV,
};

const validateEnv = () => {
  validate(data, TOKEN_VALIDATION_SCHEMA)
      .catch((err) => {
        logger.error(err);
        process.exit();
      });
};

export default validateEnv;
