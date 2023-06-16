const uuid = require('uuid');
const { hashPassword } = require('../utils/crypt')
const Users = require('../models/user.model')

const getAllUsers = async () => {
    const data = await Users.findAll({
        attributes: {
            exclude: ["password", "createdAt", "updatedAt"]
        }
    })
    return data
    //? Select * from users;
}

const getUserById = async (id) => {
    const data = await Users.findOne({
        where: { id: id },
        attributes: { exclude: ["password"] }
    })
    return data
    //? select * from users where id = ${id};
}

const createUser = async (data) => {
    const newUser = await Users.create({
        id: uuid.v4(),
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: hashPassword(data.password),
        phone: data.phone
    })
    return newUser
}

const editUser = async (userId, data) => {
    const response = await Users.update(data, {
        where: { id: userId }, attributes: {
            exclude: ["password"]
        }
    })
    return response
}

const deleteUser = async (id) =>{
    const data = await Users.destroy({
        where: {
            id: id
        }
    })
    return data
}

const getUserByEmail = async (email) =>{
    const data = await Users.findOne({
        where: {
            email: email
        }
    })
    return data
    //? select * from users where email = ${email};
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    editUser,
    deleteUser
}