//? Para respuestas exitosas
const success = ({status, data, items, message, res}) => {
    res.status(status).json({
        error: false,
        status: status,
        message: message,
        items: data.length,
        data: data
    })
} 



//? Para respuestas de errores
const error = ({status, data, message, res, fields}) => {
    res.status(status).json({
        error: true,
        status: status,
        message: message,
        fields: fields,
        data
    })
}

module.exports = {
    success,
    error
}
