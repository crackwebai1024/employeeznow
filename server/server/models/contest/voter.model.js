import mongoose from "mongoose";
import crypto from "crypto";
import validator from "validator";
import slugify from "slugify";

// voter schema who is not an employee
const VoterSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "First name is required"],
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please use a valid email"],
    },
    hashed_password: {
      type: String,
      required: "Password is required",
    },
    cell: {
      type: String,
      required: [true, "Please add a cell phone number"],
    },
    slug: String,
    voterId: {
      // randam number for voter's identification - visible in public
      type: String,
      default: function () {
        let timestamp = new Date().getTime();
        let strtime = timestamp.toString();
        let len = strtime.length;
        console.log(timestamp.toString(), len);
        console.log(strtime.slice(len - 10));
        return strtime.slice(len - 10);
      },
    },
    salt: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    birthDay: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    // virtuals true => it displays virtual schema
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * before save voter data set password as a virtual password,
 * set passwordConfirm as a virtual passwordConfirm and make
 * hashed password from password
 */
EmployeeSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

EmployeeSchema.virtual("passwordConfirm")
  .set(function (passwordConfirm) {
    this._passwordConfirm = passwordConfirm;
  })
  .get(function () {
    return this._passwordConfirm;
  });

EmployeeSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 8) {
    this.invalidate("password", "Password must be at least 8 characters.");
  }
  if (this._password !== this._passwordConfirm) {
    this.invalidate("password", "Password must be equal with passwordConfirm");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

// methods for employee model
EmployeeSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
  createPasswordResetToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store encrypted resetToken to db
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Expires in 10 min (min you want, 60 seconds, 1000milseconds)
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
  },
};
// Create a slug
EmployeeSchema.pre("save", function (next) {
  this.slug = slugify(
    `${this.firstName}-${this.lastName}-${this.employeezNowId}`,
    {
      lower: true,
    }
  );
  next();
});

export default mongoose.model("Voter", VoterSchema);
