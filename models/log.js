const mongoose = require('mongoose');
const auto_increment = require('mongoose-auto-increment');
const libs = require('../server/modules/lib');
let lib = new libs();

const connection = mongoose.createConnection(lib.db_url(), lib.db_config());
auto_increment.initialize(connection);

const Schema = mongoose.Schema;
/*
	id : 고유값
	ip : 접속IP
	time: 접속 시간
	url: 접속 URL
	http_version: http 버전
	http_methods: http methods
	user_agent: user_agent
*/
const md = lib.db_auto_increment('md_logs');
const logSchema = new Schema({
	_id: { type:Number, default: 0 },
	ip: { type: String, default: '' },
	time: { type: String, default: '' },
	url: { type: String, default: '' },
	http_version: { type: String, default: '' },
	http_method: { type: String, default: '' },
	user_agent: { type: String, default: '' },
	err: { type: String, default: '' },
});
logSchema.plugin( auto_increment.plugin, md );
module.exports = connection.model(md.model, logSchema);
