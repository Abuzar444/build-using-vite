import { StatusCodes } from "http-status-codes";

const errorHandler = async (error,req,res,next) => {
  console.log(error);
  let customError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: error.message || "Something went wrong"
  }

  if (error.name === "ValidationError") {
    customError.msg = Object.values(error.errors).map((item) => item.message).join(',');
    customError.statusCode = 400;
  }

  if (error.code && error.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(error, keyValue)} field, please choose another value`;
    customError.statusCode = 400;
  }

  if (error.name === "CastError") {
    customError.msg =`No item found with id : ${error.value}`
    customError.statusCode = 404;
  };

  return res.status(customError.statusCode).json({ msg: customError.msg });
}

export default errorHandler;