const mongoose = require('mongoose');

const schema = mongoose.Schema;

const substaticresourcesSchema = new schema({
    
ssrid : {
    type : String,
    required: true
},

srid : {
    type : String,
    required: true
},

availability  : {
    type : String,
    required: true
},

location  : {
    type : String,
    required: true
},

condition  : {
    type : String,
    required: true
},
})


const SubStaticResources = mongoose.model("SubStaticResources",substaticresourcesSchema);

module.exports = SubStaticResources;