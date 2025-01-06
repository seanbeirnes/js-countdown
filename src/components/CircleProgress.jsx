const cleanPercentage = (percentage) => {
    const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
    const isTooHigh = percentage > 100;
    return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
}

function Circle({ color, percentage }) {
    const r = 40;
    const circ = 2 * Math.PI * r
    const strokePct = ((100 - percentage) * circ) / 100;
    return (
        <circle
            r={r}
            cx={100}
            cy={100}
            fill="transparent"
            stroke={strokePct !== circ ? color : ""}
            strokeWidth={"0.75rem"}
            strokeDasharray={circ}
            strokeDashoffset={percentage ? strokePct : 0}
        ></circle>
    )
}
function Text({ color, text }) {
    return (
        <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fontSize={"1.75em"}
            fill={color}
        >
            {text}
        </text>
    )
}

function Pie({ color, text, percentage }) {
    const pct = cleanPercentage(percentage);
    return (
        <svg width={100} height={100}>
            <g transform={`rotate(-90 ${"50 100"})`}>
                <Circle color="lightgrey" />
                <Circle color={color} percentage={pct} />
            </g>
            <Text color={color} text={text} />
        </svg>
    );
};

export default function CircleProgress({ color, text, percentage }) {
    return (
        <Pie text={text} color={color} percentage={percentage} />
    )
}
