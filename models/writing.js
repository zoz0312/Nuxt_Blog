const mongoose = require('mongoose');
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
const writingSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
    writer: String,
    createDate: Date,
    count: { type:Number, default:0 },
    categoryId: { type:Number, default:0 }
});
module.exports = mongoose.model('md_wrtiing', writingSchema);