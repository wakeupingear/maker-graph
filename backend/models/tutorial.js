const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorialSchema = new Schema({
    title: String,
    type: Number,
    authorId: String,
});

module.exports= mongoose.model('Tutorial', tutorialSchema);