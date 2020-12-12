const generateResponse = (payload, success, errorMessage) => ({
  payload,
  success,
  errorMessage
});

module.exports = { generateResponse };
