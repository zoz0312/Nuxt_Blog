const express = require('express');
const router = express.Router();

const libs = require('../modules/lib');
let lib = new libs();

const category = require('../../models/category');

router.get('/', (req, res, next) => {
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
router.post('/', (req, res, next) => {
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
module.exports = router;