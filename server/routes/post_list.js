const express = require('express');
const router = express.Router();

const libs = require('../modules/lib');
let lib = new libs();

const writing = require('../../models/post');
const category = require('../../models/category');

router.post('/:contents', (req, res, next) => {
	const idx = req.params.contents;
	const findParam = {
		'categoryId': idx
	}
	const projection = {
		_id: true,
		title: true,
		createDate: true,
		writer: true,
		thumbnail: true
	};
	const sortFilter = {
		'_id': -1
	}

	let rtnObj = {
		title: '',
		arr: []
	};

	category.findOne({'_id': idx}, {title: true}).then(cate => {
		rtnObj.title = cate.title;
		return writing.find(findParam, projection).sort(sortFilter);
	}).then(write => {
		for( let key in write ){
			rtnObj.arr.push(write[key]);
		}
		lib.rtn = {
			data: rtnObj,
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