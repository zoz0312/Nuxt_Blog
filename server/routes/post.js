const express = require('express');
const router = express.Router();

const libs = require('../modules/lib');
let lib = new libs();

const writing = require('../../models/writing');

router.post('/:post', (req, res, next) => {
	writing.findOne({'_id':req.params.post}).then(write => {
		lib.rtn = {
			data: write,
			success: true,
			succ_desc: ''
		}
		console.log('write',write);
		res.send(lib.rtn_result());
		res.end();
	}).catch(err => {
		lib.rtn = {
			err_desc: err
		}
		res.send(lib.rtn_result());
		res.end();
	});
});
module.exports = router;