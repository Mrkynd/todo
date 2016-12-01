var bodyParser = require('body-parser')
var data = require('../models/data.js')
var uep = bodyParser.urlencoded({extended: false})


module.exports = function (app) {

  app.get('/', function (req, res) {
    res.send('Welcome home')
  })

  app.get('/todo', function (req, res) {
    res.render('todo', {todos: data})
  })

  app.post('/todo', uep, function (req, res) {
    data.push(req.body)
    res.json(data)
  })

  app.delete('/todo', function (req, res) {

  })


}
// git remote add origin https://github.com/Mrkynd/todo.git
// git push -u origin master
