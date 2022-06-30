const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
	time: Date,
})

const Calendar = mongoose.model("Calendar", todoSchema)
module.exports = Calendar;