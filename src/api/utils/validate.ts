/**
 * Utility helper for Joi validation.
 *
 * @param   {object}  data
 * @param   {object}  schema
 * @returns {Promise}
 */
const validate = (data: object, schema: any) => {
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    return Promise.reject(error);
  }

  return Promise.resolve(value);
};

export default validate;
