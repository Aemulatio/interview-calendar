require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3033;
const host = "0.0.0.0"
const routes = require("./lib/routes")
const cors = require("cors");
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use("/api", cors());

require('./lib/db')

app.get("/api/events", routes.getEventsList)
app.post("/api/create", routes.createNewEvent)
app.delete("/api/delete", routes.deleteEvent)


app.listen(port, host, () => {
	console.clear()
	console.log(`Server working on http://${host}:${port}`)
})

