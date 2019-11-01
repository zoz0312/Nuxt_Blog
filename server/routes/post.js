const express = require('express');
const router = express.Router();

const libs = require('../modules/lib');
let lib = new libs();

const writing = require('../../models/writing');

router.post('/add', (req, res, next) => {
	const schm = new writing();
	schm.title = req.body.title;
	schm.content = req.body.contents;
	schm.writer = 'zoz0312 (AJu)';
	schm.createDate = new Date();
	schm.categoryId = req.body.category_id;
	schm.save( (err, schm) => {
		if( err ) return console.error(err);
		lib.rtn = {
			success: true,
			succ_desc: ''
		}
		console.log('schm', schm);
		res.send(lib.rtn_result());
		res.end();
	});
});

router.post('/update', (req, res, next) => {
	writing.findById({'_id':req.body._id}).then(post => {
		post.title = req.body.title;
		post.content = req.body.contents;
		post.categoryId = req.body.category_id;
		post.save( (err, save_post) => {
			if( err ){
				lib.rtn = {
					err_desc: 'Save Fail\n' + err
				};
			} else {
				lib.rtn = {
					success: true,
					succ_desc: 'update success\n' + save_post
				};
			}
			res.send(lib.rtn_result());
			res.end();
		});
	}).catch(err => {
		lib.rtn = {
			err_desc: err
		};
		res.send(lib.rtn_result());
		res.end();
	});
});

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