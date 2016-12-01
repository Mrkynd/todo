var express = require('express')
var controller = require('./controllers/todoController.js')
var app = express()

app.set('view engine', 'ejs')
app.use(express.static('./public'))

//fire controller so that we can use app in our controllers
controller(app)

app.listen(4000, function () {
  console.log('You are listening on port 4000');
})
