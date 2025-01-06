import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { BiCalendarWeek } from "react-icons/bi";
import { BiCalendarEvent } from "react-icons/bi";
import config from "../config.json";
import "./App.css";
import CircleProgress from "./components/CircleProgress";

const title = config.title;
const targetDate = new Date(config.target_date);

function parseTime(milliseconds) {
    const MS_IN_WEEK = 604800000;
    const MS_IN_DAY = 86400000;
    const MS_IN_HOUR = 3600000;
    const MS_IN_MINUTE = 60000;
    const MS_IN_SECOND = 1000;

    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let days = 0;
    let weeks = 0;
    while (milliseconds > MS_IN_SECOND) {
        if (milliseconds > MS_IN_WEEK) {
            milliseconds -= MS_IN_WEEK;
            weeks++;
        } else if (milliseconds > MS_IN_DAY) {
            milliseconds -= MS_IN_DAY;
            days++;
        } else if (milliseconds > MS_IN_HOUR) {
            milliseconds -= MS_IN_HOUR;
            hours++;
        } else if (milliseconds > MS_IN_MINUTE) {
            milliseconds -= MS_IN_MINUTE;
            minutes++;
        } else {
            milliseconds -= MS_IN_SECOND;
            seconds++;
        }
    }
    return {
        weeks: weeks,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
    };
}

function App() {
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
        const syncTime = async () => {
            try {
                const res = await fetch(
                    "https://timeapi.io/api/time/current/zone?timeZone=America%2FNew_York",
                );
                const data = await res.json();
                const now = new Date(data.dateTime);
                const difference = targetDate.valueOf() - now.valueOf();
                setTimeDiff(difference);
                const time = parseTime(difference);
                console.log("Synced time: " + JSON.stringify(time));
                setWeeks(time.weeks);
                setDays(time.days);
                setHours(time.hours);
                setMinutes(time.minutes);
                setSeconds(time.seconds);
            } catch (err) {
                console.error("Fetching time failedd" + err);
            }
        };
        // Check if timeDiff is not set so this does not run every time
        if (timeDiff === null) {
            syncTime();
        }

        const interval = setInterval(() => {
            decrementTimes();
            // Re-sync time every 5 minutes to ensure accuracy
            if (minutes % 5 === 0 && seconds < 1) {
                syncTime();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timeDiff, seconds, minutes, hours, days, weeks]);

    if (timeDiff === null) {
        return <span className="loader"></span>;
    }
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-gray-700 text-4xl text-center">{title}</h1>
            <p>Countdown to {targetDate.toLocaleDateString()}</p>
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
            <p>Created by {config.author}</p>
        </div>
    );
}

export default App;
