const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")
// mongoose.connect("mongodb://127.0.0.1:27017/shopuserdata");

mongoose.connect("mongodb+srv://sachin:8757887103@shopdata.shpwbu2.mongodb.net/?retryWrites=true&w=majority&appName=shopdata");

const userschema = mongoose.Schema({
  usename:String,
  fullname:String,
  password:String,
  phoneno:String,
  email:String,
  orders:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"orders"

  }]
})
userschema.plugin(plm);
 module.exports = mongoose.model("users",userschema);