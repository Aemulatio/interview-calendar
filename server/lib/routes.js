const db = require("../lib/db")

exports.getEventsList = async (req, res) => {
	// console.log(req)
	console.log(req.query.date)
	const todos = await db.getEventsList(req.query.date)
	res.status(200).json(todos)
}

exports.createNewEvent = async (req, res,) => {
	const {time} = req.body;
	const added = await db.createNewEvent(time);
	res.status(201).json(added)
}

exports.deleteEvent = async (req, res,) => {
	const {id} = req.body;
	const deleted = await db.deleteEvent(id);
	res.status(200).json(deleted)
}