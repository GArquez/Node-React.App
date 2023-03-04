const Router = require('express').Router();
const {
    signUp,
    logIn,
    logOut,
    refreshToken,
    me } = require('../controllers/usersController');
const passport = require('passport');
const { verifyUser } = require('../util')

Router.post('/registrarse', signUp)

Router.post('/login', passport.authenticate('local', { session: false }), logIn)

Router.get('/logout', verifyUser, logOut)

Router.get('/yo', verifyUser, me)

Router.post('/refreshToken', refreshToken)

module.exports = Router