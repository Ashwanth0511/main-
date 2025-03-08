
const mongoose = require('mongoose')

const BikeSchema = new mongoose.Schema({
     _id: Number,
     name: String,
     price: Number,
     image: String,
     availableOn:String,
     bookedOn:String,
     type:String
})

const bikemodule = mongoose.model("bikes",BikeSchema)
module.exports = bikemodule;