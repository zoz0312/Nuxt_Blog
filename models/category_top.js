const mongoose = require('mongoose');
const auto_increment = require('mongoose-auto-increment');
const libs = require('../server/modules/lib');
let lib = new libs();

const connection = mongoose.createConnection(lib.db_url(), lib.db_config());
auto_increment.initialize(connection);

const Schema = mongoose.Schema;
/*
    id : 고유값
    title : Category TOP title
*/
const md = lib.db_auto_increment('md_category_top');
const categoryTopSchema = new Schema({
    _id: Number,
    title: String,
    mid: [{ type: Schema.Types.ObjectId, ref: 'Mid' }]
});
categoryTopSchema.plugin( auto_increment.plugin, md );
module.exports = mongoose.model(md.model, categoryTopSchema);