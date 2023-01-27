const passport = require("passport");
const UserGoogle = require("../models/userGoogle");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (email, done) {
  UserGoogle.findOne({ email }).exec((err, user) => {
    done(err, user);
  });
});

const GoogleLogin = require("./signinGoogle");
const GoogleRegister = require("./signupGoogle");

passport.use("google-signin", GoogleLogin);
passport.use("google-signup", GoogleRegister);

module.exports = passport;
