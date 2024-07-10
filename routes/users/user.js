const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Category = require('../models/Categorie');
const User = require('../models/user');

  router.get('/create/user', (req, res) => {
    Category.findAll().then(categories => {
        res.render('client/user.ejs', {
            categories: categories
        })
    })
    
  })

  router.get('/display/users', (req, res) => {
    User.findAll({raw: true}).then(users => {
        if(users != undefined) {
            res.render('dashboard/user/index.ejs', {
                users: users
            })
        } else {
            res.redirect('/create/user')
        }
    })
  })

  router.post('/post/user/data',(req, res) => {
     let {firstname, lastname, email, phone, password} = req.body;
     
    User.findOne({
        where: {email: email}
    }).then(user => {
        if(user == undefined) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password,salt);

            User.create({
                firstname: firstname,
                lastName: lastname,
                email: email,
                phone: phone,
                password: hash
             }).then(() => {
                res.redirect('/new/article')
             }).catch(error => {
                console.error(error)
             })
        } else {
            console.log('O usuario que esta a tentar cadastrar ja existe')
        }
    }).catch(error => {
        console.error(error.message)
    })
    
  })

  router.get('/admin/user/edit/:id', (req, res) => {
    let id = req.params.id;

    User.findByPk(id).then((user) => {
            res.render('dashboard/user/edit.ejs',{
                user: user
            })
        })
    })

 router.post('/post/user/update', (req, res) => {
    let {id, firstname, lastname, email, phone, password} = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password,salt);
    User.update({
       firstname: firstname,
       lastName: lastname,
       email: email,
       phone: phone,
       password: hash
    },
    {
    where: {id: id}
    }).then(() => {
        res.redirect('/display/users')
    })
 })

 router.post('/admin/delete/user', (req, res) => {
    let id = req.body.id;
    User.destroy({
        where: {id: id}
    }).then(() => {
    res.redirect('/display/users')
    }).catch(error => {
        console.error(error.message)
    })
 })

 router.get('/login', (req, res) => {
    res.render('dashboard/user/login.ejs')
 })

 router.post('/authenticate', (req, res) => {
    let {email, password} = req.body;

    User.findOne({
        where: {email: email}
    }).then(user => {
        if(user != undefined) {
            let correct = bcrypt.compareSync(password, user.password);

            if(correct) {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/new/article')
            }else{
                res.redirect('/login')
            }

        } else {
            res.redirect('/login')
        }
    }).catch(error => {
        console.log(error.message)
    })
 })

 router.get('/logout', (req, res) => {
    if(req.session.user == undefined){
     res.redirect('/');
    }
 })

module.exports = router;