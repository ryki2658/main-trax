const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let walkThroughSchema = new Schema ({
    walk_location: {type: String, required: true},
    walk_scan_date: {type: String, required: true},
    walk_details: {type: String, required: false},
    walk_motor_lubed: {type: String, required: false},
    walk_filter_change: {type: String, required: false},
    walk_user: {type: String, required: false},
});

module.exports = mongoose.model('Walk', walkThroughSchema);