const GiftModel = require('../model/gift.js');
const crypto = require('crypto');
const salt = require('../config/settings.js').salt;
var flag = 0;
//新建礼包
const createcode = function(num) {
    var count = 0;
    while(num > count){
        var random = Math.round(Math.random()*50)
        let time = new Date().getTime().toString();
        let hash = crypto.createHmac('sha256', salt)
                       .update(time)
                       .digest('hex')
                       .substring(random,random + 8);
        let json = {};
        json.code = hash;
        json.bool = true;
        json.date = new Date();
        GiftModel.create(json)
	             .then(data => {
	            	  flag++
	                  console.log('新建成功'+ data + '---共' + flag)
	              })
	              .catch(err => {
	                  console.log(err)
	              });
	               count++;
    }
};

module.exports = createcode



