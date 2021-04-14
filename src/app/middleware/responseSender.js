const httpStatusCodes = require('../data/httpStatusCodes');
const responseSender = (options = {}) => {
  const {
    statusKey = 'status',
    resultKey = 'result',
    messageKey = 'message'
  } = options;

  const getMessageByStatusCode = (statusCode) => {
    return httpStatusCodes[statusCode] || 'Unknown';
  };

  return function (req, res) {
    const result = res.locals[resultKey];
    const statusCode = res.locals[statusKey] || 200;
    const message = res.locals[messageKey] || getMessageByStatusCode(statusCode);
    res.status(statusCode);
    res.json({
      status: statusCode,
      message: message,
      data: result
    });
    return res.end();
  };
};

module.exports = responseSender;
