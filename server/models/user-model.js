const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    username: {type: String,required: true,},
    email: {type: String,required: true,},
    password: {type: String,required: true,},
    isAdmin: {type: Boolean,default: false,},
});
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const hash_password = await bcrypt.hash(user.password, 10);
        user.password = hash_password;
        next();
    } catch (error) {
        next(error);
    }
});
//jwt
userSchema.methods.generateToken = async function(){
    try{
        return jwt.sign({
            userId: this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        process.env.JWT_SECRET_KEY, {expiresIn:"30d"},
    )
    }catch(error){
        console.error(error)
    }
}

const User = mongoose.model("User", userSchema);
module.exports = User;
