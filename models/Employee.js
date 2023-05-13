const mongoose = require('mongoose');

const schema = mongoose.Schema;

const employeeSchema = new schema({
    
employee_id : {
    type : String,
    required: true
},

name : {
    type : String,
    required: true
},

email : {
    type : String,
    required: true
},

password : {
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


const Employee = mongoose.model("Employee",employeeSchema);

module.exports = Employee;