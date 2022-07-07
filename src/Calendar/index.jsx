import React, {useEffect, useState} from "react";
import {
	eachDayOfInterval,
	endOfMonth, endOfWeek,
	format,
	startOfMonth,
	startOfToday,
	startOfWeek,
	isEqual, eachHourOfInterval, add, isDate, parse, formatISO, isWithinInterval, parseISO, startOfHour
} from "date-fns"
import styled from "styled-components";
import axios from "axios";

const CalendarBlock = styled.div`
  max-width: 740px;
  max-height: 100vh;
  overflow-y: scroll;
  position: relative;
  font-family: "JetBrains Mono";
  border: 1px solid black;
`;

const CalendarHeader = styled.header`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  background-color: white;

`;

const Week = styled.div`
  background-color: #f6f6f7;
  border-top: 1px solid #E9E9E9;
  border-bottom: 1px solid #E9E9E9;
`;

const WeekDays = styled.div`
  display: flex;
  justify-content: space-around;
`;

const DayOfWeek = styled.div`
  display: flex;
  flex-direction: column;

  span {
	color: black;
	width: 20px;
	height: 20px;
	text-align: center;
  }

  span:first-of-type {
	font-size: 12px;
	padding: 10px 5px;
  }

  span:last-of-type {
	box-sizing: content-box;
	padding: 5px;
	cursor: pointer;
  }

  &.current span:last-of-type {
	border-radius: 50%;
	background-color: #a6a6a7;
	color: white;
  }

  &.today span:last-of-type {
	color: red;
  }

  &.today.current span:last-of-type {
	color: white;
	background-color: #fe4141;
	border-radius: 50%;
  }
`;

const WeekControls = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 5px 0;
`;

const ChangeWeek = styled.button`
  border: none;
  outline: none;
  background: none;
  color: #FE4141;

`;

const DaySchedule = styled.table`
  background-color: #ffffff;
  color: #C0C0C0;
  margin: 10px 0;

  border-collapse: collapse;
  table-layout: auto;
  width: 100%;
`;

const ScheduleRow = styled.tr`

  td:nth-of-type(1) {
	border: none;
	margin-left: 17px;
	text-align: center;
	vertical-align: top;
  }

  td:nth-of-type(2) {
	border-left: none;
  }

  td {
	border: 1px solid #E9E9E9;
	width: 74px;
	min-height: 58px;
	height: 58px;

	box-sizing: border-box;
  }

  td.hasEvent {
	background-color: #EBECFF;
	padding: 2px;

	border: 2px solid white;
	//display: block;
	//width: 100%;
	//height: 100%;
  }

  td.hasEvent.active {
	background-color: #b3b7ff;
  }
`;

const ScheduleCell = styled.div`
  //margin: 2px;
  min-height: 58px;
  width: 74px;
  box-sizing: content-box;
  //background-color: #ebecff;
  border-top: 1px solid #E9E9E9;
`;

const CalendarFooter = styled.footer`
  background-color: #F6F6F6;
  border-top: 1px solid #E9E9E9;
  position: sticky;
  bottom: 0;
  display: block;
  padding: 15px 30px 15px;
`;

const AddEvent = styled.button`
  color: #fe4141;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: inherit;
`;

const ToToday = styled.button`
  color: #fe4141;
  background-color: inherit;
  border: none;
  outline: none;
  cursor: pointer;
`;

const FixedHeader = styled.div`
  position: sticky;
  top: 0;
`;

const DeleteButton = styled.button`
  border: none;
  outline: none;
  background-color: inherit;
  color: #fe4141;
  cursor: pointer;
  float: right;
`;


const Calendar = () => {
	const today = startOfToday();
	const [selectedDay, setSelectedDay] = useState(today)
	const [currentWeek, setCurrentWeek] = useState(
		eachDayOfInterval({
				start: startOfWeek(today, {weekStartsOn: 1}),
				end: endOfWeek(today, {weekStartsOn: 1})
			}
		))


	const [toDelete, setToDelete] = useState("")

	const hours = eachHourOfInterval({start: selectedDay, end: add(selectedDay, {days: 1})}); //.map(hour=>format(hour, "HH:mm"))
	const [events, setEvents] = useState([])
	let schedule = {};
	useEffect(() => {
		axios.get("/api/events?date=" + format(selectedDay, "yyyy-MM-dd", new Date()).toString())
			.then(res => {
				setEvents(res.data);
				// console.log("axios get")
				// for (const event_ of res.data) {
				// 	console.log(event_)
				// 	console.log(event_.time)
				// 	console.log(parseISO(event_.time))
				// 	console.log(format(parseISO(event_.time), "HH:mm", new Date()))
				// 	console.log(startOfHour(parseISO(event_.time)))
				// 	schedule[format(parseISO(event_.time), "HH", new Date()).toString()] = {
				// 		0: isWithinInterval(parseISO(event_.time), {
				// 			start: add(startOfHour(parseISO(event_.time)), {minutes: 0}),
				// 			end: add(startOfHour(parseISO(event_.time)), {minutes: 10})
				// 		}),
				// 		10: isWithinInterval(parseISO(event_.time), {
				// 			start: add(startOfHour(parseISO(event_.time)), {minutes: 10}),
				// 			end: add(startOfHour(parseISO(event_.time)), {minutes: 20})
				// 		}),
				// 		20: isWithinInterval(parseISO(event_.time), {
				// 			start: add(startOfHour(parseISO(event_.time)), {minutes: 20}),
				// 			end: add(startOfHour(parseISO(event_.time)), {minutes: 30})
				// 		}),
				// 		30: isWithinInterval(parseISO(event_.time), {
				// 			start: add(startOfHour(parseISO(event_.time)), {minutes: 30}),
				// 			end: add(startOfHour(parseISO(event_.time)), {minutes: 40})
				// 		}),
				// 		40: isWithinInterval(parseISO(event_.time), {
				// 			start: add(startOfHour(parseISO(event_.time)), {minutes: 40}),
				// 			end: add(startOfHour(parseISO(event_.time)), {minutes: 50})
				// 		}),
				// 		50: isWithinInterval(parseISO(event_.time), {
				// 			start: add(startOfHour(parseISO(event_.time)), {minutes: 50}),
				// 			end: add(startOfHour(parseISO(event_.time)), {minutes: 60})
				// 		})
				// 	}
				// }
				// console.log(schedule)
			})
	}, [selectedDay, toDelete])

	const previousWeek = () => {
		setCurrentWeek(
			eachDayOfInterval({
					start: startOfWeek(add(currentWeek[0], {weeks: -1}), {weekStartsOn: 1}),
					end: endOfWeek(add(currentWeek[0], {weeks: -1}), {weekStartsOn: 1})
				}
			)
		)
		setToDelete("")
	}
	const nextWeek = () => {
		setCurrentWeek(
			eachDayOfInterval({
					start: startOfWeek(add(currentWeek[0], {weeks: 1}), {weekStartsOn: 1}),
					end: endOfWeek(add(currentWeek[0], {weeks: 1}), {weekStartsOn: 1})
				}
			)
		)
		setToDelete("")
	}

	const toToday = () => {
		setSelectedDay(today);
		setCurrentWeek(eachDayOfInterval({
				start: startOfWeek(today, {weekStartsOn: 1}),
				end: endOfWeek(today, {weekStartsOn: 1})
			}
		))
		setToDelete("")
	}

	const chooseToDelete = (e) => {
		const target = e.target;
		document.querySelectorAll("td").forEach(td => td.classList.remove('active'))
		if (target.classList.contains("hasEvent")) {
			target.classList.add("active")
			setToDelete(target.classList[1])
		} else {
			setToDelete("")
		}
		console.log(toDelete)
	};

	const DeleteEvent = () => {

		axios.delete("/api/delete/", {
			data: {
				id: toDelete
			}
		})
			.then(function (response) {
				console.log(response);
				setToDelete("")
				axios.get("/api/events?date=" + format(selectedDay, "yyyy-MM-dd", new Date()).toString())
					.then(res => setEvents(res.data))
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	return (
		<>
			{/*{console.log(events)}*/}
			{/*{console.log(hours)}*/}

			<CalendarBlock>
				<FixedHeader>
					<CalendarHeader>
						<span>Interview Calendar</span>
						<AddEvent onClick={() => {
							let enteredDate = prompt("Enter event time:\nYYYY-MM-DD HH:mm:ss");
							console.log(enteredDate)
							if ((enteredDate !== null || enteredDate !== "")
								&& isDate(parse(enteredDate, "yyyy-MM-dd HH:mm:ss", new Date()))) {

								const eventDate = formatISO(parse(enteredDate, "yyyy-MM-dd HH:mm:ss", new Date()));
								console.log(eventDate)

								axios.post("/api/create/", {
									time: eventDate
								})
									.then(function (response) {
										console.log(response);
										axios.get("/api/events?date=" + format(selectedDay, "yyyy-MM-dd", new Date()).toString())
											.then(res => setEvents(res.data))
									})
									.catch(function (error) {
										console.log(error);
									});
//2022-02-20 20:20:20
							}
						}}>+</AddEvent>
					</CalendarHeader>
					<Week>
						<WeekDays>
							{currentWeek.map(dayOfWeek => (
								<DayOfWeek key={dayOfWeek.toString()} onClick={() => {setSelectedDay(dayOfWeek); setToDelete("");}}
										   className={`${isEqual(dayOfWeek, today) ? "today" : ""} ${isEqual(dayOfWeek, selectedDay) ? "current" : ""}`}
								>
									<span>{format(dayOfWeek, "EEEEE")}</span>
									<span>{format(dayOfWeek, "d")}</span>
								</DayOfWeek>
							))}
						</WeekDays>
						<WeekControls>
							<ChangeWeek onClick={previousWeek}> &lt; </ChangeWeek>
							<span className="currentWeek">{format(selectedDay, "MMMM yyyy")}</span>
							<ChangeWeek onClick={nextWeek}> &gt; </ChangeWeek>
						</WeekControls>
					</Week>
				</FixedHeader>
				<DaySchedule>
					<tbody>
					{hours.map(hour => (
						<ScheduleRow key={hour.toString()}>

							<td>{format(hour, "HH:mm")}</td>

							<td className={
								events.map(event_ => (
										isWithinInterval(parseISO(event_.time), {
											start: hour,
											end: add(hour, {minutes: 10})
										}) ? " hasEvent " + event_._id : ""
									)
								).filter(x => x.length > 0)} onClick={chooseToDelete}></td>
							<td className={
								events.map(event_ => (
										isWithinInterval(parseISO(event_.time), {
											start: add(hour, {minutes: 10}),
											end: add(hour, {minutes: 20})
										}) ? " hasEvent " + event_._id : ""
									)
								).filter(x => x.length > 0)} onClick={chooseToDelete}></td>
							<td className={
								events.map(event_ => (
										isWithinInterval(parseISO(event_.time), {
											start: add(hour, {minutes: 20}),
											end: add(hour, {minutes: 30})
										}) ? " hasEvent " + event_._id : ""
									)
								).filter(x => x.length > 0)} onClick={chooseToDelete}></td>
							<td className={
								events.map(event_ => (
										isWithinInterval(parseISO(event_.time), {
											start: add(hour, {minutes: 30}),
											end: add(hour, {minutes: 40})
										}) ? " hasEvent " + event_._id : ""
									)
								).filter(x => x.length > 0)} onClick={chooseToDelete}></td>
							<td className={
								events.map(event_ => (
										isWithinInterval(parseISO(event_.time), {
												start: add(hour, {minutes: 40}),
												end: add(hour, {minutes: 50})
											}
										) ? " hasEvent " + event_._id : ""
									)
								).filter(x => x.length > 0)} onClick={chooseToDelete}></td>
							<td className={
								events.map(event_ => (
										isWithinInterval(parseISO(event_.time), {
											start: add(hour, {minutes: 50}),
											end: add(hour, {minutes: 60})
										}) ? " hasEvent " + event_._id : ""
									)
								).filter(x => x.length > 0)} onClick={chooseToDelete}></td>
						</ScheduleRow>
					))}
					</tbody>
				</DaySchedule>
				<CalendarFooter>
					<ToToday onClick={toToday}>Today</ToToday>
					{toDelete !== "" && <DeleteButton onClick={DeleteEvent}>Delete</DeleteButton>}
				</CalendarFooter>
			</CalendarBlock>

		</>
	)

}

export default Calendar;