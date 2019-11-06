const express = require('express');
const router = express.Router();

const libs = require('../modules/lib');
let lib = new libs();

const writing = require('../../models/writing');

router.post('/:contents', (req, res, next) => {
	writing.find({'categoryId':req.params.contents}).then(write => {
		let arr = [];
		for( let key in write ){
			arr.push(write[key]);
		}
		lib.rtn = {
			data: arr,
			success: true,
			succ_desc: ''
		}
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