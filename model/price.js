const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    city : String,
    price : String,
    gram: String,
    dateTime: String,     
},{
    timestamps : true
})

const priceList = mongoose.model('pricedata', priceSchema);
module.exports = priceList;