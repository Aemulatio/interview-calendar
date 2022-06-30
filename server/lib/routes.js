const db = require("../lib/db")

exports.getEventsList = async (req, res) => {
	const todos = await db.getEventsList()
	res.status(200).json(todos)
}

exports.createNewEvent = async (req, res,) => {
	const {name} = req.body;
	const added = await db.createNewEvent(name);
	res.status(201).json(added)
}