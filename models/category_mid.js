const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
    id : 고유값
    title : Category Mid Title
    top_id : Category Top ID
*/
const categoryMidSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    top_id: { type:Number, default: 0 }
});
module.exports = mongoose.model('md_category_mid', categoryMidSchema);