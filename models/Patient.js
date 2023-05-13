const mongoose = require('mongoose');

const schema = mongoose.Schema;

const patientSchema = new schema({
    
patient_id : {
    type : String,
    required: true
},

name : {
    type : String,
    required: true
},

sex : {
    type : String,
    required: true
},

age : {
    type : Number,
    required: true
},

address : {
    type : String,
    required: true
},

contact_number : {
    type : String,
    required: true
},
})


const Patient = mongoose.model("Patient",patientSchema);

module.exports = Patient;