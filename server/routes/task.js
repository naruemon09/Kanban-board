const express = require('express')
const { create, list, read, remove, update } = require('../controllers/task')
const { authCheck } = require('../middlewares/authCheck')
const router = express.Router()

router.post('/createTask', authCheck, create)
router.get('/listTask', authCheck, list)
router.get('/readTask/:id', authCheck, read)
router.delete('/deleteTask/:id', authCheck, remove)
router.put('/updateTask/:id', authCheck, update)

module.exports = router