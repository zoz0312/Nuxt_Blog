const express = require('express');
const router = express.Router();
const libs = require('../modules/lib');
let lib = new libs();

router.post('/', (req, res, next) => {
	lib.rtn = {
		success: true,
		succ_desc: 'test'
	}
	res.send(lib.rtn_result());
});
module.exports = router;