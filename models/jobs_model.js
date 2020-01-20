const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let JobSchema = new Schema ({
    job_ID: {type: String, required: false},
    job_location: {type: String, required: false},
    job_request: {type: String, required: false},
    job_details: {type: String, require: false},
    job_status: {type: String, required: false},
    job_create_date: {type: String, required: true},
    job_update_date: {type: String, required: false},
    job_user: {type: String, required: false},
    job_userName: {type: String, required: false},
    job_priority: {type: Number, required: false},
});

module.exports = mongoose.model('Job', JobSchema);