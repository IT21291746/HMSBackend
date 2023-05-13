const mongoose = require('mongoose');

const schema = mongoose.Schema;

const medicalrecordsSchema = new schema({
    
patient_id : {
    type : String,
    required: true
},

medicalrecords : {
    type : String,
    required: true
},
})


const MedicalRecords = mongoose.model("MedicalRecords",medicalrecordsSchema);

module.exports = MedicalRecords;