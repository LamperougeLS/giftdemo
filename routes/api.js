var express = require('express');
var router = express.Router();
var createcode = require('../modules/creatcode.js');
var getgift = require('../modules/getCode.js')
//创建code API
router.get('/create', function(req, res, next) {
  var num = req.num;
  res.end(createcode(num));
  next();
});

router.get('/getgift', function(req, res, next) {
  var code = getgift();
  res.end(code);
  next();
});

module.exports = router;