const mongoose = require("mongoose")

const contactschema = mongoose.Schema({
    DateAt: {
        type: Date,
        default:Date.now
      },
      name:String,
      phone:String,
      email:String,
      msg:String
});
 module.exports = mongoose.model("contact",contactschema);