const mongoose = require('mongoose');

const schema = mongoose.Schema;

const medicineSchema = new schema({
    
medicine_id : {
    type : String,
    required: true
},

name : {
    type : String,
    required: true
},

dosage : {
    type : String,
    required: true
},

price : {
    type : Number,
    required: true
},

quantity : {
    type : Number,
    required: true
},

})


const Medicine = mongoose.model("Medicine",medicineSchema);

module.exports = Medicine;