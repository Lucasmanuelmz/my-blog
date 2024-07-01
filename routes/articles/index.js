const express = require('express');
const router = express.Router();
const Categories = require('../categories/Categorie');
const Articles = require('./Articles');
const slugify = require('slugify')

router.get('/new/article', (req, res) => {
  Categories.findAll().then(categories => {
      res.render('dashboard/articles/index.ejs', {
        categories: categories
      });
  })
});

router.get('/dashboard/read/article', (req, res) => {
  Articles.findAll().then(articles => {
     res.render('dashboard/articles/article.ejs', {
      articles: articles
     })
  })
})

router.post('/dashboard/add-articles', (req, res) => {
  let {title, body, categoryId} = req.body;

  Articles.create({
    title: title,
    slug: slugify(title),
    body: body,
    categoryId: categoryId
  }).then(() => {
    res.redirect('/dashboard/read/article')
  })
});




module.exports = router;
