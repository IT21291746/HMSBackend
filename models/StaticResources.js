const mongoose = require('mongoose');

const schema = mongoose.Schema;

const staticresourcesSchema = new schema({
    
srid : {
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
})


const StaticResources = mongoose.model("StaticResources",staticresourcesSchema);

module.exports = StaticResources;