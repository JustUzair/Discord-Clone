const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  mail: {
    type: String,
    required: [true, "Email is mandatory"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email!!"],
  },
  username: { type: String, minlength: 3, maxlength: 20, unique: true },
  password: {
    type: String,
    required: [true, "A password is mandatory"],
    minlength: 8,
    validate: {
      validator: function (val) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(
          val
        );
      },
      message:
        "A password must contain, a lowercase, an uppercase, a special character and should be at least 8 characters long",
    },
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false, // this field isn't visible while querying the User Model
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // if password isn't modified, go to next middleware in the chain
  this.password = await bcrypt.hash(this.password, 12); // here '12' indicates the cost parameter and higher the value, the better the encryption will be
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword, //entered password
  userPassword // original password
) {
  return await bcrypt.compare(candidatePassword, userPassword); //compare the passwords
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000, //get time in seconds, because JWT stores time in seconds
      10
    );

    return JWTTimestamp < changedTimestamp; // Password was changed before JWT token was issued
  }
  // False means NOT changed
  return false;
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex"); // Create a random 32 byte string
  this.passwordResetToken = crypto // set hashed token in database
    .createHash("sha256") // encrypt resetToken with SHA256 algorithm
    .update(resetToken) // update its value
    .digest("hex"); // store it as hex value

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Set expiry time to 10 mins from current time
  // console.log('Token : ' + resetToken);
  return resetToken; // return un-hashed token to user
};
const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
