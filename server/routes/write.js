const express = require('express');
const router = express.Router();
const libs = require('../modules/lib');
let lib = new libs();

const writing = require('../../models/writing');

router.get('/:id', (req, res, next) => {
		lib.rtn = {
		success: true,
		succ_desc: ''
	}
	res.end(lib.rtn_result);
});
router.post('/', (req, res, next) => {
	const schm = new writing();
	schm._id = 0;
	schm.title = 'text';
	schm.content = 'hello! world';
	schm.writer = 'zoz0312 (AJu)';
	schm.createDate = new Date();
	schm.save( (err, writing) => {
		if( err ) return console.error(err);
		console.log(writing);
	});
	// writing.find({ question: 'qustion'}, (err, user) => {
  //   console.log('user',user);
  //   res.json({ user: user });
	// });
	lib.rtn = {
		success: true,
		succ_desc: ''
	}
	res.end(lib.rtn_result);
});
module.exports = router;