const mongoose = require("mongoose")
const connectionString = process.env.DB_HOST
if (!connectionString) {
	console.error("Отсутствует строка подключения к MongoDB!");
	process.exit(1)
}

mongoose.connect(connectionString);
const db = mongoose.connection;
db.on("error", err => {
	console.error(`Ошибка MongoDb: ${err.message}`);
	process.exit(1)
});
db.once("open", () => console.log("Установаленно соединение с MongoDB"))

const Todo = require("../models/todo")

Todo.find((err, todos)=>{
	if (err) console.error(err)
	if (todos.length) return

	new Todo({
		name: "test",
		done: false
	}).save()
})

module.exports = {
	getTodoList: async () => await Todo.find(),
	createNewTodo: async (name) => {
		await Todo.create({name: name})
	},
	// getVacationBySku: async sku => Vacation.findOne({sku}),
	// getAttractions: async (options = {}) => Attraction.find(options),
	// addAttraction: async attraction => new Attraction(attraction).save(),
}