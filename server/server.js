const express = require('express')
const { readdirSync } = require('fs')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = 3000;

app.use(express.json())
app.use(cors())
app.use(morgan("dev")); 

readdirSync('./routes').map((c) => app.use('/api', require('./routes/' + c)))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})