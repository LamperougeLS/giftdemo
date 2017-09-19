var express = require('express');
var router = express.Router();
var create = require('../modules/creatcode.js')
/* GET users listing. */
router.get('/create', function(req, res, next) {
  var num = req.num;
  create(num);
});

module.exports = router;