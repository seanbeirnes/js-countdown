export default function getParsedTime(milliseconds) {
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
    while (milliseconds >= MS_IN_SECOND) {
        if (milliseconds >= MS_IN_WEEK) {
            milliseconds -= MS_IN_WEEK;
            weeks++;
        } else if (milliseconds >= MS_IN_DAY) {
            milliseconds -= MS_IN_DAY;
            days++;
        } else if (milliseconds >= MS_IN_HOUR) {
            milliseconds -= MS_IN_HOUR;
            hours++;
        } else if (milliseconds >= MS_IN_MINUTE) {
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
