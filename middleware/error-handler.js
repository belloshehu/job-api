const {CustomErrorAPI} = require('../errors')
const {StatusCodes} = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) =>{
    let customError = {
        statausCode: err.statausCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong, try again later"
    }
    if(err.name === 'ValidationError'){
        customError.message = Object.values(errors).map((item)=> item.message).join(', ')
        customError.statausCode = 400
    }
    if(err.code && err.code === 11000){
        customError.message = `Duplicate value enter for ${Object.keys(err.keyValue)} field, 
           please choose another value`
        customError.statausCode = 400
    }
    if(err.name == 'CastError'){
        customError.message = `No item found with id ${err.values}`
        customError.statusCode = 404
    }
    return res.status(customError.statusCode).json({err: customError.message})
}

module.exports = errorHandlerMiddleware