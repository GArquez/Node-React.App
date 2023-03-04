const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const userSchema = require('../models/Users');

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},
async (req, email, password, done) => {
    const user = await userSchema.findOne({ email: email });
    
    if (!user) {
      return done(null, false, { message: "Not User found." });
    }
    if (!user.matchPassword(password, user.password)) {
      return done(null, false, { message: "Incorrect Password." });
    }

    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

