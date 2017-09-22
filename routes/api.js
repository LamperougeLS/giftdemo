var express = require('express');
var router = express.Router();
var GiftModel = require('../model/gift.js')
var createcode = require('../modules/creatcode.js')

// 创建code接口
router.post('/create', (req, res) => {
//这里有个坑post过来的req.body.num是String类型
//开始准备用typeof number来做类型判断，结果当然一条都创建不了
//本来也有单次创建最大数量，最后只有取巧做个数值比较
  var num = req.body.num;
  if(num<5000){
    createcode(num);
    res.send('发送成功');
  }else{
    res.send('发送失败');
  }
})

// 获取code
router.get('/code', (req, res) => {
//网上查了很久mongodb好像是没有随机单条的
//最后用10以内随机数SKIP，然后limit1条。

  var random =Math.round(Math.random()*10);
//这里过滤条件是未使用的
//如果需求是取一条少一条
//这里过滤条件换成未发放状态（数据的结构我未添加发放状态）
  GiftModel.find({bool: true})
       .skip(random)
       .limit(1)
       .then(code => {
         res.json(code)
       })
       .catch(err => {
         res.json(err)
       })
})

// 查询code被使用情况，不是发放状态，如果需要发放状态需增加一个发放状态在数据内
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