import Countdown from "./Countdown";

export default function ViewController() {
	let targetDate = null;
	let title = null;
	let timeZone = null;

	const params = new URLSearchParams(window.location.search);
	title = decodeURIComponent(params.get("title") || "Countdown");
	timeZone =
		params.get("time_zone") || Intl.DateTimeFormat().resolvedOptions().timeZone;
	const targetDateStr = params.get("target_date");

	// Check if targetDate and timeZone are valid
	try {
		if (targetDateStr) {
			targetDate = new Date(targetDateStr);
		}

		if (targetDate.toString() !== "Invalid Date") {
			targetDate.toLocaleString("en-US", {
				timeZone: timeZone,
			});
		}
	} catch (err) {
        if (window.location.search.includes("target_date")) {
            alert("Invalid parameters provided. Please check your inputs.");
            window.location.href = "/";
        }
        targetDate = null;
	}

	if (targetDate && title && timeZone) {
		return (
			<Countdown targetDate={targetDate} timeZone={timeZone} title={title} />
		);
	}

	return (
		<div className="p-6 max-w-md mx-auto text-center">
			<h1 className="text-gray-700 text-4xl text-center">Create a Countdown</h1>
			<form method="GET" className="space-y-4">
				<div>
					<label htmlFor="target_date" className="block font-medium mb-1">
						Target Date & Time
					</label>
					<input
						type="datetime-local"
						name="target_date"
						className="w-full p-2 border rounded"
					/>
				</div>
				<input
					type="text"
					name="time_zone"
					value={Intl.DateTimeFormat().resolvedOptions().timeZone}
					hidden
					readOnly
				/>
				<div>
					<label htmlFor="title" className="block font-medium mb-1">
						Title
					</label>
					<input
						type="text"
						name="title"
						className="w-full p-2 border rounded"
						placeholder="My Event Title"
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Start Countdown
				</button>
			</form>
		</div>
	);
}
