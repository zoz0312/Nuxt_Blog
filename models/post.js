const mongoose = require('mongoose');
const auto_increment = require('mongoose-auto-increment');
const libs = require('../server/modules/lib');
let lib = new libs();

const connection = mongoose.createConnection(lib.db_url(), lib.db_config());
auto_increment.initialize(connection);

const Schema = mongoose.Schema;
/*
	id : 고유값
	title : 제목
	Content : 내용
	writer : 작성자
	createDate : 작성일
	count : 방문 횟수
	categoryId : Category Mid ID
*/
const md = lib.db_auto_increment('md_post');
const postSchema = new Schema({
	_id: { type:Number, default: 0 },
	title: String,
	content: String,
	writer: String,
	createDate: String,
	categoryId: { type:Number, default:0 },
	hitCount: { type:Number, default:0 },
	thumbnail: String
});
postSchema.plugin( auto_increment.plugin, md );
module.exports = connection.model(md.model, postSchema);