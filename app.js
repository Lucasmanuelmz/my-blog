
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


app.get('/:slug', (req, res) => {
  let slug = req.params.slug;
  Articles.findAll({
    where: {
      slug: slug
    }
  }).then(articles => {
    if(articles != undefined) {
      Categories.findAll().then(categories => {
          res.render('client/read.ejs', {
          articles: articles,
          categories: categories
        })
      })
    }
    
  })
})

app.get('/', (req, res) => {
  Articles.findAll().then(articles => {
    if(articles != undefined) {
      Categories.findAll().then(categories => {
           res.render('client/index.ejs', {
          articles: articles,
          categories: categories
        })
      })
    
    }
   
  }) 
});

app.get('/category/:slug', (req, res) => {
  let slug = req.params.slug;
  Categories.findOne({
    where: {slug: slug},
    include: Articles
  }).then(category => {
    if(category != undefined) {
      Categories.findAll().then((categories) => {
        res.render('client/index.ejs', {
          articles: category.articles, 
          categories: categories
        })
      })
    }
  })
})


app.listen(3000,(error) => {
  if(!error) {
    console.log(`Servidor iniciado`)
  }
})

module.exports = app;
