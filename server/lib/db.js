const mongoose = require("mongoose")
const formatISO = require('date-fns/formatISO')
const add = require('date-fns/add')
const parseISO = require('date-fns/parseISO')

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
const {addDays, parse} = require("date-fns");

Calendar.find((err, todos) => {
	if (err) console.error(err)
	if (todos.length) return

	new Calendar({
		time: new Date()
	}).save()
})

module.exports = {
	getEventsList: async (date) => {
		console.log(date)
		console.log(formatISO(parseISO(date)));
		console.log("add")
		console.log(add(parseISO(date), {days: 2}))
		console.log(addDays(parse(date, "yyyy-MM-dd", new Date()), 2))
		// console.log(formatISO(parseISO(add(date, {days: 1}))))
		await Calendar.find({
			time: {
				$gte: formatISO(parseISO(date)),
				$lt: add(parseISO(date), {days: 2})
			}
		})
	},
	createNewEvent: async (time) => {
		await Calendar.create({time: time})
	},
	// formatISO(parse(enteredDate, "yyyy-MM-dd HH:mm:ss", new Date()));
}