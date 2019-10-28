const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
    id : 고유값
    title : Category TOP title
*/
const categoryTopSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: String
});
module.exports = mongoose.model('md_category_top', categoryTopSchema);