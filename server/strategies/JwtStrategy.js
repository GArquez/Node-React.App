const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userSchema = require('../models/Users');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

passport.use(
    new JwtStrategy( options, async function ( jwt_payload, done ){
        const user = await userSchema.findOne({ _id: jwt_payload._id});

        if (user) {
            return done(null, user);
        }
        return done(null, false);
    })
);