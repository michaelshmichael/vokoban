const mongoose = require("mongoose");

// MONGOOSE / MODEL CONFIG
const wordSchema = new mongoose.Schema({
	english: String,
	russian: String,
	example: String,
	image: String,
	tag: String,
	forms: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Form"
		}
	],
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

module.exports = mongoose.model("Word", wordSchema);