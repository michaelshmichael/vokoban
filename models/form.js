const mongoose = require("mongoose");
 
const formSchema = mongoose.Schema({
    text: String,
    pos: String
});
 
module.exports = mongoose.model("Form", formSchema);