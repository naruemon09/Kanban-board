const express = require('express')
const { create, list, read, remove, update } = require('../controllers/board')
const { authCheck } = require('../middlewares/authCheck')
const router = express.Router()

router.post('/createBoard', authCheck, create)
router.get('/listBoard', authCheck, list)
router.get('/readBoard/:id', authCheck, read)
router.delete('/deleteBoard/:id', authCheck, remove)
router.put('/updateBoard/:id', authCheck, update)

module.exports = router