const boom = require('@hapi/boom')

function validatorHandler(schema, property){
    return (req, res, next) => {
        console.log("todo esta")
        const data = req[property]
        const {error} = schema.validate(data, {abortEarly: false})
        if(error){
            next(boom.badRequest(error))
        }
        console.log("bien")
        next()
    }
}

module.exports = validatorHandler