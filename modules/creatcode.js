const GiftModel = require('../model/gift.js');
var flag = 0;
const createcode = function (num) {
	GiftModel.insert(num, function (err,data) {
		if (err) {
			console.log(err)
		}
		flag++;
	    console.log('插入成功' + data.code +'共'+ flag + '条数据');
	});
	db.close();
	return flag;
}


module.exports = createcode;



