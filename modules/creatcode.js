const salt = require('../config/settings.js').salt;
const crypto = require('crypto');
const gift = require('../model/gift.js');

const creatcode = num => {
	for (var i = 0; i < num; i++) {
		    var time = new Date().getTime().toString();
		    var hash = crypto.createHmac('md5', salt)
                   .update(time)
                   .digest('hex')
                   .substring(2,12);
            var json = {};
            json.code = hash;
            json.status = true;
            json.date = new Date();
		    gift.insertOne(json);
	}
};
module.exports = creatcode;