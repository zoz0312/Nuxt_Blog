const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
    id : 고유값
    title : Category TOP title
*/
const categoryTopSchema = new Schema({
    _id: Number,
    title: String,
    mid: [{ type: Schema.Types.ObjectId, ref: 'Mid' }]
});
module.exports = mongoose.model('md_category_top', categoryTopSchema);