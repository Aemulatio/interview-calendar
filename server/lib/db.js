const mongoose = require("mongoose")
const parseISO = require('date-fns/parseISO')
const {startOfDay, endOfDay} = require("date-fns");

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
const Calendar = require("../models/calendar")

Calendar.find((err, todos) => {
	if (err) console.error(err)
	if (todos.length) return

	new Calendar({
		time: new Date()
	}).save()
})

module.exports = {
	getEventsList: async (date) =>
		await Calendar.find({
			time: {
				$gte: startOfDay(parseISO(date)),
				$lte: endOfDay(parseISO(date))
			}
		}),
	createNewEvent: async (time) => {
		await Calendar.create({time: time})
	},
	deleteEvent: async (id) => {
		await Calendar.findByIdAndRemove(id)
	},
	// formatISO(parse(enteredDate, "yyyy-MM-dd HH:mm:ss", new Date()));
}