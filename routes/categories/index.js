const express = require('express');
const Categories = require('./Categorie');
const router = express.Router();
const slugify = require('slugify')

router.get('/dashboard/category',(req, res) => {
  res.render('dashboard/categories/index.ejs');
});

router.post('/add-categories', (req, res) => {
  let {title} = req.body;
  Categories.create({
    title: title,
    slug: slugify(title)
  }).then(() => {
    res.redirect('dasboard/categories/new')
  })
})

router.get('/dasboard/categories/new', (req, res) => {
  Categories.findAll().then((categories) => {
    if(categories != undefined) {
      res.render('dashboard/categories/newcat.ejs',{
        categories: categories
      })
    }else {
      console.log('Categoria não encontrada')
    }
  })
})

module.exports = router;
