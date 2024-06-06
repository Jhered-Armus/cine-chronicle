const express = require('express')
const router = express.Router()
const { register, login} = require('../controllers/usersControllers')

//ruta pra registrar un usuario
router.post('/register', register)

//ruta para logear un usuario
router.post('/login', login)

module.exports = router