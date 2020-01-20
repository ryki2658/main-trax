const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EquipmentSchema = new Schema ({
    equipment_name: {type: String, required: true, max: 100},
    equipment_location: {type: String, required: true, max: 100},
    equipment_details: {type: String, required: false, max: 250},
    equipment_date: {type: String, required: false}
});

module.exports = mongoose.model('Equipment', EquipmentSchema);