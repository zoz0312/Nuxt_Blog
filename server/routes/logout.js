const express = require('express');
const router = express.Router();
const libs = require('../modules/lib');
let lib = new libs();

const server_config = require('/home/ahnhc/config.json');

router.post('/', (req, res, next)=>{
	req.session.destroy( (err)=>{
		// cannot access session here
	});
	res.clearCookie(server_config.session.key_sid);
	lib.rtn = {
		success: true,
		succ_desc: '로그아웃 성공'
	}
	res.send(lib.rtn_result);
	res.end();
});
module.exports = router;