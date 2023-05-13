const mongoose = require('mongoose');

const schema = mongoose.Schema;

const orderSchema = new schema({

order_id : {
    type : String,
    required: true
},

doctor_id : {
    type : String,
    required: true
},


patient_id : {
    type : String,
    required: true
},


testtype : {
    type : String,
    required: true
},

status : {
    type : String,
    required: false
},

priority : {
    type : String,
    required:true
},
reportUrl: { type: String }



})


const Order = mongoose.model("Order",orderSchema);

module.exports = Order;