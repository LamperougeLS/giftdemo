var express = require('express');
var router = express.Router();
var GiftModel = require('../model/gift.js')
var createcode = require('../modules/creatcode.js')

// 创建code接口
router.post('/create', (req, res) => {
  var num = req.body.num;
   createcode(num);
   res.send('发送成功');
})

// 获取code
router.get('/code', (req, res) => {
  var random =Math.round(Math.random()*10);
  GiftModel.find({bool：true})
       .skip(random)
       .limit(1)
       .then(code => {
         res.json(code)
       })
       .catch(err => {
         res.json(err)
       })
})

// 查询code被使用情况
router.get('/checkstatus', (req, res) => {
  GiftModel.findOne({code:req.query.code})
    .then(data => {
      res.json(data+req.query.code)
    })
    .catch(err => {
      res.json(err)
    })
})

//使用code
router.put('/usecode',(req,res) => {
  GiftModel.findOneAndUpdate({ code : req.body.code}
       ,{ $set : { bool: false}})
       .then(movie => res.send( req.body.code +'使用成功'))
       .catch(err => res.json(err))
})

module.exports = router