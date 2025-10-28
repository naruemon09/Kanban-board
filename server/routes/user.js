const express = require('express')
const { create, list, searchUserByEmail, searchUserByEmailInBoard, notification, remove } = require('../controllers/user')
const { authCheck } = require('../middlewares/authCheck')
const router = express.Router()

router.post('/addMember', authCheck, create)
router.get('/listMember/:id', authCheck, list)
router.get("/user", authCheck, searchUserByEmail);
router.get("/userInBoard/:id", authCheck, searchUserByEmailInBoard);
router.get('/notification', authCheck, notification)
router.delete('/deleteMember/:id', authCheck, remove)

module.exports = router