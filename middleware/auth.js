import { Unauthenticated } from "../errors/index.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  // check header
  console.log(req.cookies);
  const token = req.cookies.token;

  if (!token) {
    throw new Unauthenticated('Authentication invalid');
  };
  // const authHeader = req.headers.authorization;
  // if (!authHeader || !authHeader.startsWith('Bearer')) {
  //   throw new Unauthenticated('Authentication invalid');
  // }
  // const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload)
    // attach the user request object
    // req.user = payload
    const testUser = payload.userId === "6411bb64aa29afdc278beedf";
    req.user = { userId: payload.userId, testUser };
    next();
  } catch (error) {
    throw new Unauthenticated('Authentication invalid');
  }
};

export default auth;