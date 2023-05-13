const mongoose = require('mongoose');

const schema = mongoose.Schema;

const prescriptionSchema = new schema({

doctor_id : {
    type : String,
    required: true
},


patient_id : {
    type : String,
    required: true
},


medicine : {
    type : String,
    required: true
},


})


const Prescription = mongoose.model("Prescription",prescriptionSchema);

module.exports = Prescription;