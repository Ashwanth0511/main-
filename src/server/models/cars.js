
const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({
     _id: Number,
     name: String,
     price: Number,
     image: String,
     availableOn:String,
     bookedOn:String,
     type:String
})

const carmodule = mongoose.model("cars",CarSchema)
module.exports = carmodule;