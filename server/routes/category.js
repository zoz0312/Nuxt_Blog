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
module.exports = router;