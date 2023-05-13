const mongoose = require('mongoose');

const schema = mongoose.Schema;

const currentresourcesrequestSchema = new schema({
    
csid: {
    type : String,
    required: true
},

name : {
    type : String,
    required: true
},

availablenumber  : {
    type : Number,
    required: true
},

requestedamount : {
    type : Number,
    required: true
},

threshold : {
    type : Number,
    required: true
},

unitprice : {
    type : Number,
    required: true
},
})


const CurrentResourcesRequest = mongoose.model("CurrentResourcesRequest",currentresourcesrequestSchema);

module.exports = CurrentResourcesRequest;