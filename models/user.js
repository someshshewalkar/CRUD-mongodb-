const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/mydb")


const userSchema= mongoose.Schema({
    image: String,
    email: String,
    name: String,

})

module.exports = mongoose.model("user",userSchema)