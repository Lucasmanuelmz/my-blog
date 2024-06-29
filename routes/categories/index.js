const express = require('express');
const router = express.Router();

router.get('/dashboard/category',(req, res) => {
  res.render('dashboard/categories/index.ejs');
});

module.exports = router;
