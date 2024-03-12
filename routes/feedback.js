const mongoose = require("mongoose")

const feedbackschema = mongoose.Schema({
    DateAt: {
        type: Date,
        default:Date.now
      },
      name:String,
      phone:String,
      feed:String
});
 module.exports = mongoose.model("feedback",feedbackschema);