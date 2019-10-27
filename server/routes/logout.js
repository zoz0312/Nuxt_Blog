const express = require('express');
const router = express.Router();
const libs = require('../modules/lib');
let lib = new libs();

router.post('/', (req, res, next)=>{
	req.session.destroy( (err)=>{
		// cannot access session here
	});
	lib.rtn = {
		success: true,
		succ_desc: '로그아웃 성공'
	}
	res.send(lib.rtn_result);
	res.end();
});
module.exports = router;