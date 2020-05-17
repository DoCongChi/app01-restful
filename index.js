const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./database')
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/users', db.getUsersList)
app.get('/users/:id', db.getUserById)
app.post('/users', db.insertUser)
app.put('/users/:id', db.updateUserById)
app.delete('/cats/:id', db.deleteUser)
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

