
const express = require('express');
const categoryRouter = require('./routes/categories/index');
const articleRouter = require('./routes/articles/index');
const usersRouter = require('./routes/users/user')
const session = require('express-session');
const Articles = require('./routes/models/Articles');
const Categories = require('./routes/models/Categorie');
const User = require('./routes/models/user')

const app = express();

app.set('view engine', 'ejs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', categoryRouter);
app.use('/', articleRouter)
app.use('/', usersRouter);
app.use(session({
  secret: 'rewwuydfgtehurojhgdfy', cookie: {maxAge: 300000}
}))


function authDashboard(req, res, next){
  if(req.session.user != undefined) {
      next()
   } else {
      res.redirect('/');
   }
  }

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
