const responseSender = (options = {}) => {
  const {
    statusKey = 'status',
    resultKey = 'result',
    messageKey = 'message'
  } = options;

  const getMessageByStatusCode = (statusCode) => {

    switch (statusCode) {
      case 200:
        return 'OK';
      case 400:
        return 'Bad Request';
      case 401:
        return 'Unauthorized';
      case 403:
        return 'Forbidden';
      case 404:
        return 'Not Found';
      case 405:
        return 'Method Not Allowed';
      case 406:
        return 'Not Acceptable';
      case 500:
        return 'Internal Server Error';
      case 501:
        return 'Not Implemented';
      case 502:
        return 'Bad Gateway';
      default:
        return 'Unknown';
    }
  };

  return function (req, res, next) {
    const result = res.locals[resultKey];
    const statusCode = res.locals[statusKey] || 200;
    const message = res.locals[messageKey] || getMessageByStatusCode(statusCode);
    if (result || statusCode) {
      res.status(statusCode);
      res.json({
        status: statusCode,
        message: message,
        data: result
      });
      return res.end();
    }
    return next();
  };
};

module.exports = responseSender;
