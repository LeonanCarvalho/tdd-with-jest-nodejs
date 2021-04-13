const responseSender = (options = {}) => {
  const {
    statusKey = 'status',
    resultKey = 'result',
    messageKey = 'message'
  } = options;

  return function (req, res, next) {
    const result = res.locals[resultKey] || [];
    const status = res.locals[statusKey] || 200;
    const message = res.locals[messageKey] || 'OK';
    if (result || status) {
      res.status(status);
      res.json({
        status: status,
        message: message,
        data: result
      });
      return res.end();
    }
    return next();
  };
};

module.exports = responseSender;
