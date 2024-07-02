
var express = require('express');
var indexRouter = require('./routes/categories/index');
var usersRouter = require('./routes/articles/index');

const Articles = require('./routes/models/Articles');
const Categories = require('./routes/models/Categorie');

var app = express();

app.set('view engine', 'ejs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/', usersRouter);

app.listen(3000,(error) => {
  if(!error) {
    console.log(`Servidor iniciado`)
  }
})

module.exports = app;
