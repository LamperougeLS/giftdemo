          const mongoose = require('mongoose');
const db = require('./db.js');
const crypto = require('crypto');
const salt = require('../config/settings.js').salt;
//创建一个schema结构。
const Schema = mongoose.Schema;
const giftSchema = new Schema({
    code : {type : String},
    bool : {type : Boolean},
    date : {type : Date}
});

//新建礼包码
giftSchema.statics.insert = function(num,cb) {
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
        this.model("Gift").create(json , cb);
        count++;
    }
    db.close();
};
//通过code查找
giftSchema.statics.findbycode = function (data,cb){
    this.model('Gift').find(data, cb);
};
//findone
giftSchema.statics.findone = function (cb){
    var random =Math.round(Math.random()*10);
    var obj = this.model('Gift').find({},cb).skip(random).limit(1);
};
//GET and update
giftSchema.statics.findandupdate = function (conditions, update, cb){
   this.model('Gift').findOneAndUpdate(conditions, update, cb);
};
//update data
giftSchema.statics.updatestatus =  function(conditions,update,cb){
    this.model("Gift").update(conditions, update, cb);
};
//删除
giftSchema.statics.remove = function (code) {
	this.model('Gift').remove(code, function (err) {
		if (err) {
            console.log('删除失败');
        }
        console.log('删除成功');
        db.close();
	});
};
var GiftModel=db.model('Gift', giftSchema);

module.exports = GiftModel;