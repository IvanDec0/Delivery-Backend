const userService= require('./user.service')
const responses = require('../utils/handleResponses')
const {hashPassword} = require('../utils/crypt')

const getAll = (req, res) => {
    userService.getAllUsers()
        .then(data => {
            responses.success({
                status: 200,
                data: data,
                message: 'Getting all Users',
                res
            })
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: 'Something bad getting all users',
                res
            })
            console.log(err);
        })
}

const getById = (req, res) => {
    const id = req.params.id
    userService.getUserById(id)
        .then(data => {
            if (data) {
                responses.success({
                    status: 200,
                    data,
                    message: `Getting User with id: ${id}`,
                    res
                })
            } else {
                responses.error({
                    status: 404,
                    message: `User with ID: ${id}, not found`,
                    res
                })
            }
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: 'Something bad getting the user',
                res
            })
        })
}

const edit = (req, res) => {
    const id = req.params.id
    const data = req.body
    if (!Object.keys(data).length) { // si no existen los key, entro al error
        return res.status(400).json({ message: 'Missing data' })
    } else if (
        !data.nombre ||
        !data.apellido ||
        !data.email ||
        !data.telefono
    ) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                nombre: 'string',
                apellido: 'string',
                email: 'example@example.com',
                telefono: 'string'
            }
        })
    } else {
        const response = userService.editUser(id, data)
        return res.status(200).json({
            message: 'User edited succesfully',
            user: data
        })
    }
}

const remove = (req, res) => {
    const id = req.params.id

    userService.deleteUser(id)
        .then(data => {
            if (data) {
                responses.success({
                    status: 200,
                    data,
                    message: `User with id: ${id} deleted successfully`,
                    res
                })
            } else {
                responses.error({
                    status: 404,
                    data: err,
                    message: `The user with ID ${id} not found`,
                    res
                })
            }
        })
        .catch(err => {
            responses.error({
                status: 400,
                data: err,
                message: `Error ocurred trying to delete user with id ${id}`,
                res
            })
        })
}


const getMyUserById = (req, res) => {
    const id = req.user.id

    userService.getUserById(id)
        .then(data => {
            responses.success({
                res,
                status: 200,
                message: 'This is your current user',
                data
            })
        })
        .catch(err => {
            responses.error({
                res,
                status: 400,
                message: 'Something bad getting the current user',
                data: err
            })
        })
}

const removeMyUser = (req, res) => {
    const id = req.user.id
    const data = userService.deleteUser(id)
    if (data) {
        return responses.success({
            res,
            status: 200,
            message: `User deleted successfully with id: ${id}`,
            data: data
        })
    }else{
    return responses.error({
        res,
        status: 400,
        message: 'Something bad trying to delete this user',
        err
    })
}
}

const editMyuser = (req, res) => {
    const userId = req.user.id
    const { first_name, last_name, email, password, phone } = req.body

    const data = {
        first_name,
        last_name,
        email,
        password: hashPassword(password),
        phone
    }
    userService.editUser(userId, data)
        .then(() => {
            responses.success({
                res,
                status: 200,
                message: 'Your user has been updated succesfully!',
                data: data
            })
        })
        .catch(err => {
            responses.error({
                res,
                status: 400,
                message: 'Something bad',
                data: err
            })
        })
}

module.exports = {
    getAll,
    getById,
    edit,
    remove,
    getMyUserById,
    editMyuser,
    removeMyUser
}