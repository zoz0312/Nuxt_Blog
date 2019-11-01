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
const md = lib.db_auto_increment('md_category');
const categorySchema = new Schema({
    _id: { type:Number, default: 0 },
    title: String
});
categorySchema.plugin( auto_increment.plugin, md );
module.exports = connection.model(md.model, categorySchema);