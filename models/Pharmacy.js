const mongoose = require('mongoose');

const schema = mongoose.Schema;

const pharmacySchema = new schema({
    
pharmacy_id : {
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


const Pharmacy = mongoose.model("Pharmacy",pharmacySchema);

module.exports = Pharmacy;