const mongoose = require('mongoose');

const schema = mongoose.Schema;

const currentresourcesSchema = new schema({
    
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

threshold : {
    type : Number,
    required: true
},

unitprice : {
    type : Number,
    required: true
},
})


const CurrentResources = mongoose.model("CurrentResources",currentresourcesSchema);

module.exports = CurrentResources;