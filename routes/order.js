const mongoose = require("mongoose")

const userschema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    name:String,
    Aalo_pokora:Number,
    Egg_pokora:Number,
    pokora:Number,
    boil_egg:Number,
    kacha_egg:Number,
    Egg_fry:Number,
    Egg_omeletee:Number,
    Egg_coch:Number,
    bred_pokora:Number,
    DateAt: {
        type: Date,
        default:Date.now
    },
    address:String,
    mobile_no:String,
    mobile_no2:String,
    pincode:String,
    price:String
});
 module.exports = mongoose.model("orders",userschema);