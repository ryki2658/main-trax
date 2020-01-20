const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PickupSchema = new Schema ({
    pickup_location: {type: String, required: false, max: 100},
    pickup_details: {type: String, required: false, max: 250},
    pickup_paid: {type: String, required: false, max: 4},
    pickup_po: {type: String, required: false, max: 20},
    pickup_date: {type: String, required: false},
    pickup_update_date: {type: String, required: false},
    pickup_for: {type: String, required: false},
});

module.exports = mongoose.model('pickup', PickupSchema);