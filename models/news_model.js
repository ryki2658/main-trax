const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NewsSchema = new Schema ({
    news_headline1: {type: String, required: false, max: 100},
    news_body1: {type: String, required: false},
    news_headline2: {type: String, required: false, max: 100},
    news_body2: {type: String, required: false},
    news_body3: {type: String, required: false},
    news_date: {type: String, required: false},
});

module.exports = mongoose.model('news', NewsSchema);