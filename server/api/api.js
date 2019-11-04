const express = require('express');
const router = express.Router();
const libs = require('../modules/lib');
let lib = new libs();

router.post('/user_status', (req, res, next) => {
	lib.rtn = {
		data: {
			auth: req.session.permission ? req.session.permission : null
		},
		success: true,
		succ_desc: '로그인 성공'
	}
	console.log('lib.rtn', lib.rtn);
	res.send(lib.rtn_result());
});
module.exports = router;