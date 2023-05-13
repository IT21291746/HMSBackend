const mongoose = require('mongoose');

const schema = mongoose.Schema;

const resultSchema = new schema({

result_id : {
    type : String,
    required: true
}, 
order_id : {
    type : String,
    required: true
},    
patient_id : {
    type : String,
    required: true
},   

testtype : {
    type : String,
    required : true
},

status : {
    type : String,
    required: true
},

})


const Result = mongoose.model("Result",resultSchema);

module.exports = Result;