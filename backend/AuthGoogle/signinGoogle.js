const Strategy = require("passport-local").Strategy;
const UserGoogle = require("../models/userGoogle");

const LoginStrategy = new Strategy(
  { usernameField: "email", passwordField: "googleId" },
  function (email, password, done) {
    UserGoogle.findOne({ email })
      .lean()
      .exec((err, user) => {
        if (err) {
          return done(err, null);
        }

        if (!user) {
          return done("No user found", null);
        }

        const isPasswordValid = password === user.googleId;

        if (!isPasswordValid) {
          return done("Google authentication failed", null);
        }

        return done(null, user);
      });
  }
);

module.exports = LoginStrategy;