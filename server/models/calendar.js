const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
	name: String,
	done: {
		type: Boolean,
		default: false
	},
})

const Todo = mongoose.model("Todos", todoSchema)
module.exports = Todo;