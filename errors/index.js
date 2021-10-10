const CustomErrorAPI = require('./custom-error')
const UnauthenticatedError = require('./unauthenticated')
const BadRequestError = require('./bad-request')
const NotFoundError = require('./not-found')

module.exports = {
    CustomErrorAPI,
    UnauthenticatedError,
    BadRequestError,
    NotFoundError
}