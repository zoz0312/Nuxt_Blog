const express = require('express');
const router = express.Router();
const libs = require('../modules/lib');
let lib = new libs();

const writing = require('../../models/writing');

router.get('/', (req, res, next) => {
	//TODO json Find
	//item: this.$http.get('/write')
	lib.rtn = {
		data: writing.find({}),
		success: true,
		succ_desc: ''
	}
	const obj = lib.rtn_result();
	res.end(obj);
});
router.post('/', (req, res, next) => {
	const schm = new writing();
	schm._id = 0;
	schm.title = req.body.title;
	schm.content = req.body.contents;
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
	res.end(lib.rtn_result());
});
module.exports = router;