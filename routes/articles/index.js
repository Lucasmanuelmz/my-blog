const express = require('express');
const router = express.Router();
const Categories = require('../models/Categorie');
const Articles = require('../models/Articles');
const slugify = require('slugify')

router.get('/new/article', (req, res) => {
  Categories.findAll().then(categories => {
      res.render('dashboard/articles/index.ejs', {
        categories: categories
      });
  })
});

router.get('/dashboard/read/article', (req, res) => {
  Articles.findAll({
    include: Categories
  }).then(contents => {

     res.render('dashboard/articles/article.ejs', {
      contents: contents
     })
  }).catch((error) => {
    console.log('Erro: '+error.message)
  })
})

router.post('/dashboard/add-articles', (req, res) => {
  let {title, body, categoryId} = req.body;

  Articles.create({
    title: title,
    slug: slugify(title),
    body: body,
    categorieId: categoryId
  }).then(() => {
    res.redirect('/dashboard/read/article')
  })
});

router.post('/article/delete', (req, res) => {
  let {id} = req.body;
  let my_id = Number(id)
  if(my_id != undefined) {
      Articles.destroy({
        where: {
          id: id
        }
      }).then(() => {
        res.redirect('/new/article');
        console.log('Apagado com sucesso')
      })
  } else {
    res.redirect('/new/article')
    console.log('Não encontrado')
  }
})




module.exports = router;
