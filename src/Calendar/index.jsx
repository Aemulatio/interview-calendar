import React from "react";
import {
	eachDayOfInterval,
	eachWeekOfInterval,
	endOfMonth, endOfWeek,
	format,
	startOfMonth,
	startOfToday,
	startOfWeek
} from "date-fns"


const Calendar = () => {
	const today = startOfToday();
	const dayStartOfMonth = startOfMonth(today)
	const dayEndOfMonth = endOfMonth(today)
	const dates = eachDayOfInterval({
		start: dayStartOfMonth,
		end: dayEndOfMonth
	})

	const dayStartOfWeek = startOfWeek(today, {weekStartsOn:1})
	const dayEndOfWeek = endOfWeek(today, {weekStartsOn: 1})
	const thisWeek = eachDayOfInterval({
		start: dayStartOfWeek,
		end: dayEndOfWeek
	})


	return (
		<>
			{console.log(today)}
			{console.log(format(today, "yyyy-MM-dd"))}
			{console.log(dates)}
			{console.log(thisWeek)}

			<div>
				{dates.map((day, dayIndex) => (
					<div key={day.toString()}>{format(day, "d")}</div>
				))}
			</div>

			<div className="Calendar">
				<header>
					<span>Interview Calendar</span>
					<span>+</span>
				</header>
				<header className="week">
					<div className="weekDays">
						{thisWeek.map(dayOfWeek=>(
							<span key={dayOfWeek.toString()}>{format(dayOfWeek, "EEEEE")}</span>
						))}
					</div>
					<div className="weekDates">
						{thisWeek.map(dayOfWeek=>(
							<span key={dayOfWeek.toString()}>{format(dayOfWeek, "d")}</span>
						))}
					</div>
					<div className="weekControls">
						<button className="prevWeek"> &lt; </button>
						<span className="currentWeek">{format(today, "MMMM yyyy")}</span>
						<button className="prevWeek"> &gt; </button>
					</div>
				</header>
			</div>

		</>
	)

}

export default Calendar;