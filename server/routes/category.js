const express = require('express');
const router = express.Router();

const libs = require('../modules/lib');
let lib = new libs();

const category = require('../../models/category');

router.post('/', (req, res, next) => {
	category.find({}).then(category => {
		lib.rtn = {
			data: category,
			success: true,
			succ_desc: ''
		}
		res.send(lib.rtn_result());
	}).catch(err => {
		lib.rtn = {
			err_desc: err
		}
		res.send(lib.rtn_result());
	});
});

router.post('/add', (req, res, next) => {
	const schm = new category();
	schm.title = req.body.title;
	schm.save( (err, category) => {
		if( err ){
			console.error(err);
		}
		lib.rtn = {
			success: true,
			succ_desc: ''
		}
		res.send(lib.rtn_result());
	});
});

router.post('/update', (req, res, next) => {
	category.findById({'_id':req.body._id}).then(category => {
		category.title = req.body.title;
		category.save( (err, save_category) => {
			if( err ){
				lib.rtn = {
					err_desc: 'Save Fail\n' + err
				};
			} else {
				lib.rtn = {
					success: true,
					succ_desc: 'update success\n' + save_category
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

router.post('/:categoryId', (req, res, next) => {
	category.findOne({'_id':req.params.categoryId}).then(category => {
		lib.rtn = {
			data: category,
			success: true,
			succ_desc: ''
		}
		console.log('category',category);
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