const express = require('express');
const router = express.Router();
const moment = require('moment');
const libs = require('../modules/lib');
let lib = new libs();

const postHit = require('../../models/post_hit');
const writing = require('../../models/post');
const pageHit = require('../../models/page_hit');

require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

let ip, postId;

router.post('/postHit', (req, res, next) => {
	ip = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
	postId = req.body.postId;
	const curDate = moment().format('YYYY-MM-DD');

	postHit.find({
		$and: [{'postId': postId, 'hitIp': ip}]
	}).then( postHit => {
		// Check Hit IP & Date
		if( postHit !== null && postHit.length !== 0 ){
			const chkDate = postHit.some( obj => {
				return obj.hitDate === curDate;
			})
			if( chkDate ){
				lib.rtn = {
					success: true,
					succ_desc: 'Already Counted'
				};
				res.send(lib.rtn_result());
				res.end();
			} else {
				next();
			}
		} else {
			next();
		}
	});
});
router.post('/postHit', (req, res, next) => {
	let schm = new postHit();
	schm.hitIp = ip;
	schm.postId = postId;
	schm.hitDate = moment().format('YYYY-MM-DD');
	schm.save().then(() => {
		return writing.updateOne({ '_id':postId }, {
			$inc: { hitCount: 1 }
		})
	}).then( () => {
		lib.rtn = {
			success: true,
			succ_desc: 'update success'
		};
		res.send(lib.rtn_result());
		res.end();
	}).catch( err => {
		lib.rtn = {
			err_desc: err
		};
		res.send(lib.rtn_result());
		res.end();
	});
});

router.post('/pageHit', (req, res, next) => {
	const userIp = req.body.userIp;
	const curDate = moment().format('YYYY-MM-DD');
	pageHit.find({
		$and: [{'hitDate': curDate, 'hitIp': userIp}]
	}).then( hitResult => {
		if( hitResult === null || hitResult.length === 0 ){
			//HIT
			let schm = new pageHit();
			schm.hitIp = userIp;
			schm.hitDate = curDate;
			schm.save();
		}
	});
	res.end();
});
module.exports = router;