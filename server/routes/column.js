const express = require('express')
const { create, list, read, remove, update } = require('../controllers/column')
const { authCheck } = require('../middlewares/authCheck')
const router = express.Router()

router.post('/createColumn', authCheck, create)
router.get('/listColumn', authCheck, list)
router.get('/readColumn:id', authCheck, read)
router.delete('/deleteColumn', authCheck, remove)
router.put('/updateColumn', authCheck, update)

module.exports = router