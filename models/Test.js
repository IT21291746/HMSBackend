const mongoose = require('mongoose');

const schema = mongoose.Schema;

const testSchema = new schema({
    
test_id : {
    type : String,
    required: true
},

test_name : {
    type : String,
    required: true
},

description : {
    type : String,
    required: true
},

cost : {
    type : Number,
    required: true
},

})


const Test = mongoose.model("Test",testSchema);

module.exports = Test;