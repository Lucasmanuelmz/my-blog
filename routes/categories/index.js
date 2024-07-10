const express = require('express');
const Categories = require('../models/Categorie');
const router = express.Router();
const slugify = require('slugify')

router.get('/dashboard/category', (req, res) => {
  res.render('dashboard/categories/index.ejs');
});

router.post('/add-categories', (req, res) => {
  let {title} = req.body;
  Categories.create({
    title: title,
    slug: slugify(title)
  }).then(() => {
    res.redirect('dashboard/categories/new')
  })
})

router.get('/dashboard/categories/new', (req, res) => {
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

router.post('/category/delete', (req, res) => {
  let {id} = req.body;
  let my_id = Number(id)
  if(my_id != undefined) {
      Categories.destroy({
        where: {
          id: id
        }
      }).then(() => {
        res.redirect('/dashboard/categories/new');
        console.log('Apagado com sucesso')
      })
  } else {
    res.redirect('/dashboard/categories/new')
    console.log('Não encontrado')
  }
})

router.get('/dashboard/categories/edit/:id', (req, res) => {
          let id = req.params.id;

    Categories.findByPk(id).then(category => {
      if(category != undefined) {
        res.render('dashboard/categories/edit.ejs',{
          category: category
        })
      }  
    })
       
    })

module.exports = router;
