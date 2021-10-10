const UserModel = require('../models/auth')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')

const login = async(req, res) =>{
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError("Please provide email and password")
    }
    const user = await UserModel.findOne({email})
    if(!user){
        throw new UnauthenticatedError("Provide valid credentials")
    }
    const isCorrectPassword = await user.comparePassword(password)
    if(!isCorrectPassword){
        throw new UnauthenticatedError("Provide valid credentials")
    }
    const token = user.getJWT()
    res.status(StatusCodes.OK).json({user: {username: user.username}, token})
}

const register = async(req, res) =>{
    const user = await UserModel.create({...req.body})
    res.status(StatusCodes.CREATED).json({user: {username: user.username}, token: user.getJWT()})
}

module.exports = {
    login, register
}