const mongoose = require('mongoose');
const auto_increment = require('mongoose-auto-increment');
const libs = require('../server/modules/lib');
let lib = new libs();

const connection = mongoose.createConnection(lib.db_url(), lib.db_config());
auto_increment.initialize(connection);

const Schema = mongoose.Schema;
/*
	id : 고유값
	hitIp : Hit한 IP
	hitDate : Hit한 날짜
	hitTime : Hit한 시간
*/
const md = lib.db_auto_increment('md_page_hit');
const pageHitSchema = new Schema({
	_id: { type:Number, default: 0 },
	hitIp: String,
	hitDate: String,
	hitTime: String
});
pageHitSchema.plugin( auto_increment.plugin, md );
module.exports = connection.model(md.model, pageHitSchema);