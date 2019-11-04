const express = require('express');
const router = express.Router();
const libs = require('../modules/lib');
let lib = new libs();

router.post('/session_status', (req, res, next) => {
	lib.rtn = {
		data: {
			permission: req.session.permission
		},
		success: true,
		succ_desc: 'test'
	}
	console.log('BACK-END req.session', req.session);
	console.log('BACK-END', lib.rtn);
	res.send(lib.rtn_result());
});
module.exports = router;