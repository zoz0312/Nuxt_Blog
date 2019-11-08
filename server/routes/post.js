const express = require('express');
const router = express.Router();
const moment = require('moment');
const libs = require('../modules/lib');
let lib = new libs();

const posts = require('../../models/post');

require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

router.post('/create', (req, res, next) => {
	let schm = new posts();
	schm.title = req.body.title;
	schm.content = req.body.contents;
	schm.writer = 'zoz0312 (AJu)';
	schm.createDate = moment().format('YYYY-MM-DDTHH:mm:ss');
	schm.categoryId = req.body.category_id;
	schm.thumbnail = req.body.thumbnail;
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
	posts.updateOne({
		'_id': req.body._id
	},{
		$set: {
			title: req.body.title,
			content: req.body.contents,
			categoryId: req.body.category_id
		}
	}).then(() => {
		lib.rtn = {
			success: true,
			succ_desc: 'update success'
		};
		res.send(lib.rtn_result());
		res.end();
	}).catch(err => {
		lib.rtn = {
			err_desc: err
		};
		res.send(lib.rtn_result());
		res.end();
	});
});

router.delete('/', (req, res, next) => {
	posts.remove({ _id: req.body._id }).then( del_writing => {
		if( err ){
			lib.rtn = {
				err_desc: 'Save Fail\n' + err
			};
		} else {
			lib.rtn = {
				success: true,
				succ_desc: 'Delete success\n' + del_writing
			};
		}
		res.send(lib.rtn_result());
		res.end();
	}).catch(err => {
		lib.rtn = {
			err_desc: err
		};
		res.send(lib.rtn_result());
		res.end();
	});
});

router.post('/:post', (req, res, next) => {
	posts.findOne({'_id':req.params.post}).then(write => {
		lib.rtn = {
			data: write,
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