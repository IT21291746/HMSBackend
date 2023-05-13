const mongoose = require('mongoose');

const schema = mongoose.Schema;

const doctorSchema = new schema({
    
doctor_id : {
    type : String,
    required: true
},

name : {
    type : String,
    required: true
},

password  : {
    type : String,
    required: true
},

specialization : {
    type : String,
    required: true
},

age : {
    type : Number,
    required: true
},

gender : {
    type : String,
    required: true
},

contact_number : {
    type : String,
    required: true
},
})


const Doctor = mongoose.model("Doctor",doctorSchema);

module.exports = Doctor;