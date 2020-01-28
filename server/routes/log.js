const express = require('express');
const router = express.Router();
const libs = require('../modules/lib');
let lib = new libs();

const log = require('../../models/log');

router.post('/', (req, res, next) => {
	log.find({}).then(data => {
		lib.rtn = {
			data: data,
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