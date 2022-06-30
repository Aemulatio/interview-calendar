const db = require("../lib/db")

exports.getEventsList = async (req, res) => {
	const todos = await db.getEventsList()
	res.status(200).json(todos)
}

exports.createNewEvent = async (req, res,) => {
	const {time} = req.body;
	const added = await db.createNewEvent(time);
	res.status(201).json(added)
}