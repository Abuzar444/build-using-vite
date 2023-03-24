import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

import {
  BadRequestError,
  Unauthenticated
}
  from "../errors/index.js";

import attachCookies from "../utils/attachCookie.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values")
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use")
  }

  const user = await User.create({ name, email, password });

  const token = user.createJWT();
  attachCookies({ res, token });

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    location: user.location,
  });
};

const login = async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    throw new BadRequestError("Please provide all values")
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Unauthenticated('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new Unauthenticated('Invalid Credentials');
  }

  const token = user.createJWT();
  user.password = undefined;
  attachCookies({ res, token });

  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    location: user.location,
  });
};

const updateUser = async (req, res) => {
  const { name, email, location, lastName } = req.body;

  if (!name || !email || !location || !lastName) {
    throw new BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();
  const token = user.createJWT();
  attachCookies({ res, token });

  res.status(StatusCodes.OK).json({
    user,
    location: user.location
  });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user, location: user.location });
}

const logoutUser = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000)
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
}


export { register, login, updateUser, getCurrentUser, logoutUser };
