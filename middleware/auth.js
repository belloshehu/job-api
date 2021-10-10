const {UnauthenticatedError} = require('../errors')
const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) =>{
    // const {email, username, password} = req.body
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError("Invalid authentication")
    }
    const token = authHeader.split(' ')[1]
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {id, username}
        next()
    }catch(error){
        throw new UnauthenticatdedError("Unauthorized accessed")
    }
}

module.exports = authenticateUser