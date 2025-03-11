const mongoose  = require("mongoose")
const complainSchema = new mongoose.Schema({
    name:String,
    email:String,
    complain:String
})

const complainmodule = mongoose.model("complains",complainSchema)
module.exports = complainmodule;