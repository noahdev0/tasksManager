const { CustomeAPIError } = require("../errors/costume-error");
const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomeAPIError) {
    return res.status(error.statusCode).json({ msg: error.message });
  }
  return res.status(500).json({ msg: error });
};
module.exports = errorHandler;
