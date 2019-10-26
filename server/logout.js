const express = require('express');
const router = express.Router();
const libs = require('./lib');
let lib = new libs();

router.post('/', (req, res, next)=>{
	req.session.destroy( (err)=>{
		// cannot access session here
	});
	lib.rtn = {
		success: true,
		data : {
			key:'1',
			data:[
				{
				question: "!!question!!",
				items: ['web','is','free']
				},{
				question: "!!question2222",
				items: ['try','test','anmal']
				},{
				question: "다음 동물로 바른것은?",
				items: ['사람','잉어','금붕어']
				}
			]
		}
	}
	res.send(lib.rtn_result);
	res.end();
});
module.exports = router;