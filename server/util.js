const passport = require('passport');
const jwt = require('jsonwebtoken')

const COOKIE_OPTIONS = {
    httpOnly: true,
    signed: true,
    maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
    sameSite: "lax"
}

const getToken = ( user ) => {
    return jwt.sign( user, process.env.JWT_SECRET, {
        expiresIn: eval(process.env.SESSION_EXPIRY)
    })
};

const getRefreshToken = ( user ) => {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY)
    })
    return refreshToken
};

const verifyUser = passport.authenticate("jwt", { session: false });

module.exports = {
    COOKIE_OPTIONS,
    getToken,
    getRefreshToken,
    verifyUser
}