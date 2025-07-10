const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], { abortEarly: false, stripUnknown: true });
    if (error) {
      return res.status(400).json({ message: 'Validation error', details: error.details });
    }
    req[property] = value;
    next();
  };
};

module.exports = validate