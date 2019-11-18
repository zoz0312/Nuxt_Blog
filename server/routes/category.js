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

router.post('/create', (req, res, next) => {
	const schm = new category();
	schm.title = req.body.title;
	schm.parentIdx = req.body.parentIdx;
	schm.depth = req.body.depth;
	schm.save( (err) => {
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
	let update_cnt = 0;
	const arr = req.body.post_arr;
	const len = arr.length;

	for( let i=0; i<len; i++ ){
		category.updateOne({
			'_id': arr[i]._id
		},{
			$set: {
				title: arr[i].title,
				parentIdx: arr[i].parentIdx
			}
		}).then(() => {
			update_cnt++;
			if( update_cnt === len ){
				lib.rtn = {
					success: true,
					succ_desc: 'update success'
				};
				res.send(lib.rtn_result());
				res.end();
			}
		}).catch(err => {
			lib.rtn = {
				err_desc: 'len: ' + len + 'success: '+ update_cnt + ' ' + err
			};
			res.send(lib.rtn_result());
			res.end();
		});
	}
});

router.delete('/', (req, res, next) => {
	category.remove({ _id: req.body._id }).then( del_category => {
		if( err ){
			lib.rtn = {
				err_desc: 'Save Fail\n' + err
			};
		} else {
			lib.rtn = {
				success: true,
				succ_desc: 'Delete success\n' + del_category
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

router.post('/:categoryId', (req, res, next) => {
	category.findOne({'_id':req.params.categoryId}).then(category => {
		lib.rtn = {
			data: category,
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