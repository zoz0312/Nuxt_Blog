const express = require('express');
const router = express.Router();

const libs = require('../modules/lib');
let lib = new libs();

const writing = require('../../models/writing');

router.get('/', (req, res, next) => {
	writing.find({}).then(write => {
		lib.rtn = {
			data: write,
			success: true,
			succ_desc: ''
		}
		console.log('write',write);
		res.send(lib.rtn_result());
		//res.end();
	}).catch(err => {
		lib.rtn = {
			err_desc: err
		}
		res.send(lib.rtn_result());
		//res.end();
	});
});
router.post('/', (req, res, next) => {
	const schm = new writing();
	//schm._id = 1;
	schm.title = req.body.title;
	schm.content = req.body.contents;
	schm.writer = 'zoz0312 (AJu)';
	schm.createDate = new Date();
	schm.save( (err, writing) => {
		if( err ) return console.error(err);
	});
	lib.rtn = {
		success: true,
		succ_desc: ''
	}
	res.send(lib.rtn_result());
});
module.exports = router;