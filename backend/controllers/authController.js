const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("./../utils/appErrors");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/UserModel");
const Email = require("./../utils/email");
const signToken = (id, email) => {
  /*
    |-------------------------------------------------------------------------|
    | Sign the JWT with your private signature, that indicates the validity   | 
    | and authenticity of the token                                           |    
    |-------------------------------------------------------------------------|
  */
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createAndSendToken = (user, statusCode, req, res) => {
  /*
    |-------------------------------------------------------------------------|
    | Get the signed token and return is as cookie in the http response header|
    |-------------------------------------------------------------------------|
  */
  const token = signToken(user._id, user.mail);
  /*
    |--------------------------------------------------------------------------------------------------|
    |   The req.secure property is an Boolean property that is true if a TLS connection is established |
    |   else return false.                                                                             |
    |                                                                                                  |
    |   To get information about which protocol used between client and load balancer,                 |
    |   we can use the X-Forwarded-Proto request header.                                               |
    |   Using this header, the client can make an HTTP request to an HTTPS-only resource.              |
    |--------------------------------------------------------------------------------------------------|
  */
  const cookieOptions = {
    // maxAge: new Date(
    //   Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 //cookie will expire after this time
    // ),
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 //cookie will expire after this time
    ),
    httpOnly: true, // Allow cookies to be only used by web-browsers to prevent modification
    secure: req.secure || req.headers["x-forwarded-proto"] === "https", // allow cookies to only be used with https
  };

  res.cookie("jwt", token, cookieOptions); // Set cookie with name "jwt" = token, with cookie options
  // Remove password from output
  user.password = undefined;
  //Send data of user alongside the signed JWT token
  res.status(statusCode).json({
    status: "success",
    userDetails: {
      token,
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { username, mail, password } = req.body;
  const user = await User.exists({ mail });
  if (user) {
    return next(new AppError("User with that email already exists", 400));
  }
  const newUser = await User.create({
    username,
    mail,
    password,
  });
  let url = `${req.protocol}://localhost:3000/dashboard`; // Localhost
  if (process.env.NODE_ENV === "production") {
    url = `${req.protocol}://${req.get("host")}/dashboard`; // Get Host, of the live website
  }
  await new Email(newUser, url).sendWelcome();
  createAndSendToken(newUser, 201, req, res); // Sign JWT and send it as response
});
exports.login = catchAsync(async (req, res, next) => {
  const { mail, password } = req.body;
  if (!mail || !password) {
    return next(new AppError("Email and password are required", 400));
  }
  const user = await User.findOne({ mail }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password)))
    // Generate error when user not found, or password is incorrect
    return next(new AppError("Incorrect email or password"), 401);
  //   console.log(req.headers);
  createAndSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //   console.log(req.cookies);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt && req.cookies.jwt !== "Logged out successfully") {
    token = req.cookies.jwt;
  }

  //   if (req.cookies.jwt === "Logged Out Successfully") return res.redirect("/");
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //   console.log(`Decoded : ${JSON.stringify(decoded)}`);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("User belonging to this token does no longer exist!") //If user doesn't exist, generate an app-error and return
    );
  }
  if (currentUser.changedPasswordAfter(decoded.iat))
    return next(
      new AppError("User recently changed the password, please log in again")
    );
  req.user = currentUser; // Add currently logged in user to req object
  res.locals.user = currentUser;
  next();
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "Logged Out Successfully", {
    expires: new Date(Date.now() + 10 * 1000), // expires in 10 seconds from now
    httpOnly: true, // Allow cookies to be only used by web-browsers to prevent modification
  });
  res.status(200).json({
    status: "success",
  });
});
