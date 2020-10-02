import crypto from "crypto";
import Employee from "../../models/employee/basic.model";
import Employer from "../../models/employer/basic.model";
import { sendEmail } from "../../utils/email";
import CRUD from "../crud/utils/general";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "../../../config/config";

// create token for signin user
const createToken = (id) => {
  return jwt.sign({ _id: id }, config.jwtSecret);
};

const create = async (req, res, next) => {
  await CRUD.create(Employee, req, res, next);
};

// check the user signin
const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: "auth",
  algorithms: ["HS256"],
});

// check the user has auth to access one's data
const hasAuthorization = (req, res, next) => {
  const authorized =
    req.auth && (req.body.id === req.auth._id || req.query.id === req.auth._id);

  if (!authorized) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
};

// user signin with email and password
const signIn = async (req, res) => {
  let user = {};
  let role = req.body.role;
  try {
    if (role === "employee") {
      user = await Employee.findOne({ email: req.body.email });
    }

    if (role === "employer") {
      user = await Employer.findOne({ email: req.body.email });
    }

    if (!user) {
      return res.status("401").json({
        error: `${role} not found`,
      });
    }

    if (!user.authenticate(req.body.password)) {
      return res
        .status("401")
        .json({ error: "Email and password don't match." });
    }

    const token = createToken(user._id);
    res.cookie("t", token, {
      expire: new Date() + 3600,
    });
    console.log(user);

    return res.status(200).json({
      token,
      [role]: {
        _id: user._id,
        email: user.email,
        slug: user.slug,
      },
    });
  } catch (err) {
    return res.status("401").json({ error: "Could not sign in" });
  }
};

//** Forgot Password **/
const forgotPassword = async (req, res) => {
  // Get user by email
  let user;
  if (req.body.role === "employee") {
    user = await Employee.findOne({ email: req.body.email });
  }

  if (req.body.role === "employer") {
    user = await Employer.findOne({ email: req.body.email });
  }

  if (!user) {
    return res.status(404).json({
      error: "There is no user with this email address",
    });
  }

  // Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // Send it to user's email;
  const resetUrl = `${req.protocol}://${req.headers.origin}/resetPassword/${resetToken}`;
  const message = `Someone has requested a link to change your password. 
        You can do this through the button below: ${resetUrl}\n
        If you didn't request this, please ignore this email. `;

  console.log(message);
  // send message to the user email
  try {
    let sendResult = await sendEmail({
      email: user.email,
      subject: "Your password reset (valid for 10 min)",
      message,
    });

    if (sendResult) {
      return res.status(200).json({
        status: "success",
        message: "Token sent to email",
      });
    } else {
      return res.status(500).json({ error: "server error" });
    }
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(500).json({
      error: "There was an error sending to the email. Try again later",
    });
  }
};

/*reset password*/
const resetPassword = async (req, res) => {
  const { token, newPassword, role } = req.body;

  // Encrypt request token and compare with db
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  console.log(hashedToken);
  let user;
  if (role === "employee") {
    console.log("mongodb");
    user = await Employee.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
  }

  if (role === "employer") {
    user = Employee.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
  }

  //  if token has not expired, and there is user, set the new password
  if (!user) {
    return res.status(400).json({
      error: "Token is invalid or time is expired.",
    });
  }

  console.log(user.firstName);
  user.password = newPassword;
  user.passwordConfirm = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangedAt = Date.now();

  try {
    await user.save();
    console.log("after save");
    // Log the user in
    const token = createToken(user.employeezNowId);
    console.log("after token");
    res.cookie("t", token, {
      expire: new Date() + 3600,
    });

    return res.status(200).json({
      token,
      [role]: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "sorry! server error, please reset password again",
    });
  }
};

export default {
  forgotPassword,
  resetPassword,
  signIn,
  create,
  requireSignin,
  hasAuthorization,
};
