const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        minlength: 3,
        maxlength:50,
        required: [true, "Please provide username"]
    },
    email: {
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
        required: [true, "Please provide email"],
        unique: [true, "Someone is already using this email "]
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, "Please provide password"]
    }

})

// hash password before saving it
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.getJWT = function(){
    const token = jwt.sign(
        {id: this._id, username: this.username}, 
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRATION}
    )
    return token
}

UserSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}

module.exports = mongoose.model("User", UserSchema)