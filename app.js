
var express = require('express');

var indexRouter = require('./routes/categories/index');
var usersRouter = require('./routes/articles/users');

var app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(3000,(error) => {
  if(!error) {
    console.log(`Servidor iniciado`)
  }
})

module.exports = app;
