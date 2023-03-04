const userSchema = require('../models/Users')
const jwt = require('jsonwebtoken');

const { getToken, 
    COOKIE_OPTIONS, 
    getRefreshToken } = require('../util')

const signUp = async ( req, res ) => {
    try {
        let errors = [];

        const { name, email, password, confirmPssw } = req.body;
        if ( password != confirmPssw ) {
            errors.push({ text: "Passwords do not match." });
        };
        if ( password.length < 4 ) {
            errors.push({ text: "Password must be at least 4 characteres." });
        };
        if ( errors.length > 0 ) {
            return res.send(errors, req.body)
                      .status(500);
        };

        const userUsed = await userSchema.findOne({ email: email });
        if ( userUsed ) {
            return res.json({ error: "Email already use." });
        };

        const newUser = new userSchema(
            { 
            name,
            email,
            password 
            }
        );
        newUser.password = await newUser.encryptPassword(password);

        const token = getToken({ _id: newUser._id });
        const refreshToken = getRefreshToken ({ _id: newUser._id });
        newUser.refreshToken.push({ refreshToken });

        await newUser.save();

        res.status(200).cookie("refreshToken", refreshToken, COOKIE_OPTIONS).send({ succes: true, token })
    } catch (err) {
        console.log( err )
    };
};

const logIn = async (req, res) => { 
    try{
        const token = getToken({ _id: req.user._id });
        const refreshToken = getRefreshToken({ _id: req.user._id });
        const user = await userSchema.findById({ _id: req.user._id});

        user.refreshToken.push({ refreshToken });

        await user.save()
        res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS).send({ succes: true, token })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
};

const logOut = async ( req, res, next ) => {
    try {
        const { signedCookies } = req;
        const { refreshToken } = signedCookies

        

        const user = await userSchema.findById(req.user._id)
        
        const tokenIdx = user.refreshToken.findIndex( 
            item => item.refreshToken === refreshToken
        )
        
        if ( tokenIdx !== -1 ) {
            user.refreshToken.id(user.refreshToken[tokenIdx]._id).remove()
        }
        await user.save()
        
        res.status(200).clearCookie("refreshToken", COOKIE_OPTIONS).send({ succces: true });
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

const refreshToken = async ( req, res, next ) => {
    try {
        const { signedCookies } = req;
        const { refreshToken } = signedCookies;


        if (refreshToken) {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const userId = payload._id;

            const user = await userSchema.findOne({ _id: userId });
            if (user) {
                const tokenIdx = user.refreshToken.findIndex( item => item.refreshToken === refreshToken );
    
                if ( tokenIdx === -1 ) {
                    res.status(401)
                }
    
                const token = getToken({ _id: userId });
                const newRefreshToken = getRefreshToken({ _id: userId});
                user.refreshToken[tokenIdx] = { refreshToken: newRefreshToken }
                await user.save()
    
                res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS).json({ succes: true, token });
            } else {
                res.status(401)
            }
        } else {
            res.status(401).send({ message: 'Unauthorized'})
        }
    } catch (err) {
        console.log(err)
    }
}

const me = async (req, res) => {
    try {
        if (req.user) {
        const { name, email, isAdmin } = req.user
        
        res.status(200).json({name, email, isAdmin})
        } else {
            res.status(400)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }

}

module.exports = {
    signUp,
    logIn,
    logOut,
    refreshToken,
    me
}