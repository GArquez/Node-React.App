const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const Session = new Schema({
    refreshToken: { type: String, default: "" }
});

const userSchema = new Schema({
    name: String,
    email: { type: String, require: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    refreshToken: [Session]
},
{
    timestamps: true,
});

userSchema.methods.encryptPassword = async (password) => {
    try{
        
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch(err) {
        console.log('Encrypt error:', err)
    }
};

userSchema.methods.matchPassword = async (pswCandidate, pswToBeCompared) => {
    try {
        return await bcrypt.compare(pswCandidate, pswToBeCompared);
    } catch (err) {
        console.log('Bcrypt error:', err);
    }
};

userSchema.set('toJSON', {
    transform: function ( doc, ret, options ) {
        delete ret.refreshToken
        return ret 
    }
});

module.exports = model( 'user', userSchema )