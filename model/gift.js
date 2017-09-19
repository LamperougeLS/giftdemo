const mongoose = require('mongoose');
const db = require('./db.js');
const Schema = mongoose.Schema;
const giftSchema = new Schema({
    code : String,
    status : Boolean,
    date : Date
});
//新建礼包码
giftSchema.statics.insertOne = function(json) {
    var insertOne = new gift(json);
    insertOne.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('存入成功' + json.code);
        }
    });
};
//通过code查找
giftSchema.statics.findbycode = function (code){
    this.model('Gift').find({code: code}, function (err) {
        if (err) {
            console.log('查找失败');
        }
        console.log('查找成功');
         db.close();
    });
};
//
giftSchema.statics.updatestatus = function (code,status){
    this.model('Gift').update( code, status, function (err) {
        if (err) {
            console.log('update失败');
        }
        console.log('update成功');
         db.close();
    });
};

giftSchema.statics.remove = function (code) {
	this.model('Gift').remove(code, function (err) {
		if (err) {
            console.log('删除失败');
        }
        console.log('删除成功');
        db.close();
	});
};


const gift=db.model('Gift', giftSchema);

module.exports = gift;