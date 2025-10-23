const express = require('express')
const { create, list } = require('../controllers/user')
const router = express.Router()

router.post('/addMember', create)
router.get('/listMember/:id', list)
// router.get('/listTaskBy:id', listBy)
// router.delete('/deleteTask', remove)
// router.put('/updateTask', update)

module.exports = router