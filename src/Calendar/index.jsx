import React from "react";
import {
	eachDayOfInterval,
	endOfMonth, endOfWeek,
	format,
	startOfMonth,
	startOfToday,
	startOfWeek,
	isEqual
} from "date-fns"
import styled from "styled-components";

const CalendarBlock = styled.div`
  max-width: 740px;

  border: 1px solid black;
`;

const CalendarHeader = styled.header`
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;

const Week = styled.div`
  background-color: #f6f6f7;

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
  }

  span:last-of-type:hover {
	border-radius: 50%;
	background-color: #a6a6a7;
	color: white;
  }

`;

const CurrentDate = styled.div`
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
	
	border-radius: 50%;
	background-color: #FE4141;
	color: white;
  }

  //span:last-of-type:hover {
	//border-radius: 50%;
	//background-color: #a6a6a7;
	//color: white;
  //}

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

const DaySchedule = styled.div`

`;

const CalendarFooter = styled.footer`
  background-color: #F6F6F6;
  color: #FE4141;
`;


const Calendar = () => {
	const today = startOfToday();
	const dayStartOfMonth = startOfMonth(today)
	const dayEndOfMonth = endOfMonth(today)
	const dates = eachDayOfInterval({
		start: dayStartOfMonth,
		end: dayEndOfMonth
	})

	const dayStartOfWeek = startOfWeek(today, {weekStartsOn: 1})
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

			<CalendarBlock>
				<CalendarHeader>
					<span>Interview Calendar</span>
					<span>+</span>
				</CalendarHeader>
				<Week>
					<WeekDays>
						{thisWeek.map(dayOfWeek => (
							isEqual(dayOfWeek, today)
								?
								<CurrentDate key={dayOfWeek.toString()}>
									<span>{format(dayOfWeek, "EEEEE")}</span>
									<span>{format(dayOfWeek, "d")}</span>
								</CurrentDate>
								:
								<DayOfWeek key={dayOfWeek.toString()}>
									<span>{format(dayOfWeek, "EEEEE")}</span>
									<span>{format(dayOfWeek, "d")}</span>
								</DayOfWeek>
						))}
					</WeekDays>
					<WeekControls>
						<ChangeWeek> &lt; </ChangeWeek>
						<span className="currentWeek">{format(today, "MMMM yyyy")}</span>
						<ChangeWeek> &gt; </ChangeWeek>
					</WeekControls>
				</Week>
				<DaySchedule>

				</DaySchedule>
				<CalendarFooter>
					Today
				</CalendarFooter>
			</CalendarBlock>

		</>
	)

}

export default Calendar;