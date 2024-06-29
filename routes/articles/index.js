const express = require('express');
const router = express.Router();

router.get('/dashboard/article', (req, res) => {
  res.render('dashboard/articles/index.ejs');
});

module.exports = router;
