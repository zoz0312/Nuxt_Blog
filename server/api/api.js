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
			schm.hitTime = moment().format('HH:mm:ss');
			schm.save();
		}
	});
	res.end();
});
router.post('/pageHitData', (req, res, next) => {
	let totalCount = 0;
	const dateArr = [
		moment().format('YYYY-MM-DD'),
		moment().subtract(1, 'days').format('YYYY-MM-DD'),
		moment().subtract(2, 'days').format('YYYY-MM-DD'),
		moment().subtract(3, 'days').format('YYYY-MM-DD'),
		moment().subtract(4, 'days').format('YYYY-MM-DD'),
		moment().subtract(5, 'days').format('YYYY-MM-DD'),
		moment().subtract(6, 'days').format('YYYY-MM-DD')
	]
	pageHit.countDocuments().then((count) => {
		totalCount = count;
		return pageHit.find({
			$or: [
				{'hitDate': dateArr[0]},
				{'hitDate': dateArr[1]},
				{'hitDate': dateArr[2]},
				{'hitDate': dateArr[3]},
				{'hitDate': dateArr[4]},
				{'hitDate': dateArr[5]},
				{'hitDate': dateArr[6]}
			]
		});
	}).then((hitResult) => {
		let count = [0, 0, 0, 0, 0, 0, 0];
		const obj = Object.keys(hitResult);
		for( let i=0; i<obj.length; i++ ){
			count[dateArr.indexOf(hitResult[i].hitDate)]++;
		}
		lib.rtn = {
			data: {
				totalCount,
				count,
				dateArr
			},
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
module.exports = router;