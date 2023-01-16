module.exports = wrap = (success, message, data) => {
  return {
    success: success,
    message: message,
    data: data,
  };
};
