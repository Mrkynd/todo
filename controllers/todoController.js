var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var uep = bodyParser.urlencoded({extended: false})
// var data = require('../models/data.js')

//connect to database
mongoose.Promise = global.Promise;//saves us from deprecated error
mongoose.connect('mongodb://test:test@ds119788.mlab.com:19788/rs-todo')

//once connected create a schema.
//This is how you define the types you want to use save, create, update or delete
var todoSchema = mongoose.Schema({
  item: String
})

var Todo = mongoose.model('Todo', todoSchema)
// var itemOne = Todo({
//   item: 'buy flowers'
// }).save(function (err) {
//   if (err) throw err;
//   console.log('Item saved');
// })

module.exports = function (app) {

  app.get('/', function (req, res) {
    res.send('Welcome home')
  })

  app.get('/todo', function (req, res) {
    //get data from mongo db and pass to view
    Todo.find({}, function (err, data) {
      if (err) throw err;
      res.render('todo', {todos: data})
    })
    //res.render('todo', {todos: data}) uses data var above
  })

  app.post('/todo', uep, function (req, res) {
    //get data from the view and add to database mongo
    var newTodo = Todo(req.body).save(function (err, data) {
      if(err) throw err;
      res.json(data)
    })
    // data.push(req.body)
    // res.json(data)
  })

  app.delete('/todo/:item', function (req, res) {
    Todo.find({item: req.params.item.replace(/\-/g, " ")})
      .remove(function (err, data) {
        if (err) throw data;
        res.json(data)
      })
    // data = data.filter(function (todo) {
    //   var a = todo.item.replace(/ /g, '-') !== req.params.item
    //   return a
    // })
    // res.json(data)
  })
}//module.exports = function(app)
