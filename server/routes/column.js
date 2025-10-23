const express = require('express')
const { create, list, read, remove, update } = require('../controllers/column')
const { authCheck } = require('../middlewares/authCheck')
const router = express.Router()

router.post('/createColumn', authCheck, create)
router.get('/listColumn/:id', authCheck, list)
router.get('/readColumn/:id', authCheck, read)
router.delete('/deleteColumn/:id', authCheck, remove)
router.put('/updateColumn/:id', authCheck, update)

module.exports = router