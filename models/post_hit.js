const mongoose = require('mongoose');
const auto_increment = require('mongoose-auto-increment');
const libs = require('../server/modules/lib');
let lib = new libs();

const connection = mongoose.createConnection(lib.db_url(), lib.db_config());
auto_increment.initialize(connection);

const Schema = mongoose.Schema;
/*
	id : 고유값
	postId : Post의 ID
	hitDate : Hit한 날짜
	hitIp : Hit한 IP
*/
const md = lib.db_auto_increment('md_post_hit');
const postHitSchema = new Schema({
	_id: { type:Number, default: 0 },
	postId: { type:Number, default:0 },
	hitDate: String,
	hitIp: String
});
postHitSchema.plugin( auto_increment.plugin, md );
module.exports = connection.model(md.model, postHitSchema);