// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const AppError = require("../utils/myAppError");
const catchAsync = require("../utils/catchAsync");

// register a new user
const loginUser = catchAsync(async (req, res, next) => {
  const { walletAddress } = req.body;

  let user = await User.findOne({ walletAddress });
  if (!user) {
    user = await User.create({ walletAddress });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.status(201).json({
    status: "success",
    token,
  });
});

// verify a JWT token and return the user object
const verifyToken = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.split(" ")[1]) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("Please provide jwt token", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (user) {
    req.user = user;
  }

  req.user = user;
  next();
});

module.exports = {
  loginUser,
  verifyToken,
};
