import React from "react";
import {
	eachDayOfInterval,
	endOfMonth, endOfWeek,
	format,
	startOfMonth,
	startOfToday,
	startOfWeek,
	isEqual, eachHourOfInterval, add
} from "date-fns"
import styled from "styled-components";

const CalendarBlock = styled.div`
  max-width: 740px;
  font-family: "JetBrains Mono";
  border: 1px solid black;
`;

const CalendarHeader = styled.header`
  padding: 20px;
  display: flex;
  justify-content: space-between;
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
  background-color: #ffffff;
  color: #C0C0C0;
  margin: 10px 0;
`;

const ScheduleRow = styled.div`
  
  padding-left: 10px;
  //height: 62px;

  display: flex;
	
  div:not(:first-child) {
	border-left: 1px solid #E9E9E9;
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
  color: #FE4141;
  border-top: 1px solid #E9E9E9;
  position: fixed;
  bottom: 0;
  display: block;
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
	});

	const hours = eachHourOfInterval({start: today, end: add(today, {days: 1})})


	return (
		<>
			{console.log(today)}
			{console.log(format(today, "yyyy-MM-dd"))}
			{console.log(dates)}
			{console.log(thisWeek)}
			{console.log(hours)}

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
					{hours.map(hour => (
						<ScheduleRow key={hour.toString()}>
							{format(hour, "HH:mm")}
							<ScheduleCell></ScheduleCell>
							<ScheduleCell></ScheduleCell>
							<ScheduleCell></ScheduleCell>
							<ScheduleCell></ScheduleCell>
							<ScheduleCell></ScheduleCell>
							<ScheduleCell></ScheduleCell>
							<ScheduleCell></ScheduleCell>
						</ScheduleRow>
					))}

				</DaySchedule>
				<CalendarFooter>
					Today
				</CalendarFooter>
			</CalendarBlock>

		</>
	)

}

export default Calendar;