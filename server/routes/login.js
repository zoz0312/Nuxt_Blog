const express = require('express');
const router = express.Router();
const libs = require('../modules/lib');
const server_config = require('/home/ahnhc/config.json');
let lib = new libs();

router.post('/', function(req, res, next) {
	const user_id = req.body.id;
	const user_pw = req.body.pw;

	if( user_id != server_config.server.id && user_pw != server_config.server.pw ){
		lib.rtn.err_desc = 'login fail';
		res.end(lib.rtn_result);
	}

	req.session.user_id = user_id;
	req.session.user_pw = user_pw;
	req.session.save();

	lib.rtn = {
		success: true,
		succ_desc: '로그인 성공'
	}
	res.send(lib.rtn_result);
	res.end();
});
module.exports = router;