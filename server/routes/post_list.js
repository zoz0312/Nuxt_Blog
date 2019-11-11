const express = require('express');
const router = express.Router();

const libs = require('../modules/lib');
let lib = new libs();

const writing = require('../../models/post');

router.post('/:contents', (req, res, next) => {
	const findParam = {
		'categoryId':req.params.contents
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

	writing.find(findParam, projection).sort(sortFilter).then(write => {
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