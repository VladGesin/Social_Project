/*jshint ignore:start*/

module.exports = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};
ß;
