const express = require('express')
const { register, login, currentUser } = require('../controllers/auth')
const { authCheck } = require('../middlewares/authCheck')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/current-user', authCheck, currentUser)

module.exports = router