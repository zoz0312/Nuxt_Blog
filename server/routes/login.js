const express = require('express');
const router = express.Router();
const libs = require('../modules/lib');
const server_config = require('/home/ahnhc/config.json');
let lib = new libs();

router.post('/', function(req, res, next) {
	const user_id = req.body.username;
	const user_pw = req.body.password;

	if( user_id === server_config.server.id && user_pw === server_config.server.pw ){
		if( user_id === server_config.server.id ){
			req.session.permission = 'admin';
		} else {
			req.session.permission = 'user';
		}
		req.session.user_id = user_id;
		req.session.save(() => {
			lib.rtn = {
				data: { auth: req.session.permission },
				success: true,
				succ_desc: '로그인 성공'
			}
			res.send(lib.rtn_result());
		});
	} else {
		lib.rtn.err_desc = 'login fail';
		res.send(lib.rtn_result());
	}
});
module.exports = router;
