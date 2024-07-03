const express = require('express');
const router = express.Router();
const Categories = require('../models/Categorie');
const Articles = require('../models/Articles');
const slugify = require('slugify');

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

router.get('/article/edit/:id', (req, res) => {
  let {id} = req.params;
  Articles.findByPk(id).then(article => {
    Categories.findAll().then(categories => {
      res.render('dashboard/articles/edit.ejs', {
      article: article,
      categories: categories
    })
    })
  })
})

router.post('/article/update', (req, res) => {
  let id = req.body.id;
  let {title, body, categoryId} = req.body;
  Articles.update({
    title: title, 
    sulg: slugify(title),
    body: body,
    categorieId: categoryId
    
  },
  {
    where: {id: id}
  }
).then(() => {
  res.redirect('/dashboard/read/article')
}).catch((error) => {
  console.log(error.message)
}) 
})

router.get('/article/page/:page', (req,res) => {
  let page = req.params.page;

  let offset = 0;

  if(isNaN(page) || offset == 1) {
     offset = 0;
  } else {
    offset = parseInt(page) * 1;
  }

  Articles.findAndCountAll({
    limit: 1,
    offset: offset
  }).then((articles) => {

    let next;
    if(offset + 1 >= articles.count) {
      next = false;
    } else {
      next = true;
    }

    let result = {
      page: parseInt(page),
      next: next,
      articles: articles
    }
    Categories.findAll().then((categories => {
      res.render('client/page.ejs', {
        result: result,
        categories: categories
      })
    }))
  })
})




module.exports = router;
