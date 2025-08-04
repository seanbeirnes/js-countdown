import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { BiCalendarWeek } from "react-icons/bi";
import { BiCalendarEvent } from "react-icons/bi";
import CircleProgress from "./CircleProgress";
import getParsedTime from "../helpers/getParsedTime";

export default function Countdown({ targetDate, timeZone, title }) {
	const nowAsTimeZoneStr = new Date(Date.now()).toLocaleString("en-US", {
		timeZone: timeZone,
	});
	const nowDateWithTimeZone = new Date(nowAsTimeZoneStr);
	const nowAsUTCStr = new Date(Date.now()).toLocaleString("en-US", {
		timeZone: "UTC",
	});
	const nowDateWithUTC = new Date(nowAsUTCStr);
	const offset = nowDateWithUTC.getTime() - nowDateWithTimeZone.getTime();
	targetDate = new Date(targetDate.getTime() + offset);

	const targetDateLocal = new Date(
		targetDate.getTime() - targetDate.getTimezoneOffset() * 60000,
	);

	const circleColor1 = "#eab308";
	const circleColor2 = "#f97316";
	const circleColor3 = "#ef4444";
	const [timeDiff, setTimeDiff] = useState(null);
	const [weeks, setWeeks] = useState(0);
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	function decrementTimes() {
		let tmpSeconds = seconds;
		let tmpMinutes = minutes;
		let tmpHours = hours;
		let tmpDays = days;
		let tmpWeeks = weeks;

		tmpSeconds--;

		if (tmpSeconds < 0) {
			// Check if there are no more minutes
			tmpSeconds = tmpMinutes === 0 ? 0 : 59;
			tmpMinutes--;
		}
		setSeconds(tmpSeconds);

		if (tmpMinutes < 0) {
			// Check if there are no more minutes
			tmpMinutes = tmpHours === 0 ? 0 : 59;
			tmpHours--;
		}
		setMinutes(tmpMinutes);

		if (tmpHours < 0) {
			// Check if there are no more days
			tmpHours = tmpDays === 0 ? 0 : 23;
			tmpDays--;
		}
		setHours(tmpHours);

		if (tmpDays < 0) {
			// Check if there are no more weeks
			tmpDays = tmpWeeks === 0 ? 0 : 6;
			tmpWeeks--;
		}
		setDays(tmpDays);

		if (tmpWeeks < 0) {
			tmpWeeks = 0;
		}
		setWeeks(tmpWeeks);
	}

	useEffect(() => {
		const nowLocal = new Date(Date.now());
		const now = new Date(
			nowLocal.getTime() + nowLocal.getTimezoneOffset() * 60000,
		);
		const difference = targetDate.valueOf() - now.valueOf();
		const time = getParsedTime(difference);
		setTimeDiff(difference);
		setWeeks(time.weeks);
		setDays(time.days);
		setHours(time.hours);
		setMinutes(time.minutes);
		setSeconds(time.seconds);

		const interval = setInterval(() => {
			decrementTimes();
		}, 1000);

		return () => clearInterval(interval);
	}, [timeDiff, seconds, minutes]);

	return (
			<main className="flex flex-col items-center">
				<h1 className="text-gray-700 text-4xl text-center">{title}</h1>
				<p>Countdown to {targetDateLocal.toLocaleString()}</p>
				<div className="max-w-xl m-8 p-8 flex flex-col bg-gray-50 shadow-2xl rounded">
					<div className="m-2 w-full flex flex-row justify-evenly align-center">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							className="flex flex-col items-center align-center"
						>
							<div className="flex items-center align-center">
								<BiCalendarWeek size={32} className="fill-green-600" />
								<p className="text-2xl text-green-600">Weeks</p>
							</div>
							<span className="text-green-600 text-2xl font-bold">{weeks}</span>
						</motion.div>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							className="flex flex-col items-center align-center"
						>
							<div className="flex items-center align-center">
								<BiCalendarEvent size={32} className="fill-blue-600" />
								<p className="text-2xl text-blue-600">Days</p>
							</div>
							<span className="text-blue-600 text-2xl font-bold">{days}</span>
						</motion.div>
					</div>
					<hr />
					<div className="flex flex-row items-center align-center">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							className="p-2 flex flex-col items-center align-center"
						>
							<p className="text-2xl font-bold text-yellow-500">Hours</p>
							<CircleProgress
								text={hours}
								percentage={(hours / 24) * 100}
								color={circleColor1}
							/>
						</motion.div>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							className="p-2 flex flex-col items-center align-center"
						>
							<p className="text-2xl font-bold text-orange-500">Minutes</p>
							<CircleProgress
								text={minutes}
								percentage={(minutes / 60) * 100}
								color={circleColor2}
							/>
						</motion.div>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							className="p-2 flex flex-col items-center align-center"
						>
							<p className="text-2xl font-bold text-red-500">Seconds</p>
							<CircleProgress
								text={seconds}
								percentage={(seconds / 60) * 100}
								color={circleColor3}
							/>
						</motion.div>
					</div>
				</div>
				<div className="flex flex-row items-center justify-center">
					<button
						type="submit"
						className="bg-blue-600 text-white m-6 px-4 py-2 rounded hover:bg-blue-700"
						onClick={() => {
							window.location.href = "/";
						}}
					>
						New Countdown
					</button>
					<button
						type="submit"
						className="bg-green-600 text-white m-6 px-4 py-2 rounded hover:bg-green-700"
						onClick={() => {
							navigator.clipboard.writeText(window.location.href);
                            alert("Copied share link to clipboard!");
						}}
					>
						Copy Share Link
					</button>
				</div>
			</main>
	);
}
