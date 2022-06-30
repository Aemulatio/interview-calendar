const db = require("../lib/db")

exports.getTodoListApi = async (req, res) => {
	const todos = await db.getTodoList()
	res.status(200).json(todos)
}

exports.createNewTodoApi = async (req, res,) => {
	const {name} = req.body;
	const added = await db.createNewTodo(name);
	res.status(201).json(added)
}