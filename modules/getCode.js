const GiftModel = require('../model/gift.js');
const update = {bool : false};
const getcode = function (cb) {
 	var code = GiftModel.findone(function(err,data){
	if (err) {
			console.log(err)
		}
	    cb(data[0].code);
	    return data[0].code;

    }
)};

const updatecode =  function(code){
	GiftModel.updatestatus({code : code} , update , function(err,data){
		if (err) {
			console.log(err)
		}
	     console.log(code);
	})
}
const getgift = function(){
	return getcode(updatecode);
	db.close();
}

module.exports = getgift;



