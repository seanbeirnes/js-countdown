# 🕒 JS-Countdown

A simple client-side countdown app that reads query parameters to display a real-time clock counting down to any future date and time.
If query params are missing or invalid, the app renders a form for the user to input the date, time, and title.

## 🚀 Features

* **Timezone aware**: Automatically adjusts for time zones. Works with IANA time zones (e.g. `America/New_York`).
* **Fallback**: If the params are missing or invalid, a form is displayed to input date/time and title.
* Written with **React + Tailwind**

## 📦 Installation

```bash
git clone https://github.com/seanbeirnes/js-countdown.git
cd js-countdown
npm install
npm run dev
```

## 🧩 Usage

### ✅ Via URL params:

```text
https://yourhost.com/?target_date=2025-08-01T00%3A00&time_zone=America%2FNew_York&title=My%20Countdown
```

* `target_date`: A date and time string.
* `time_zone`: Time zone for the target_date (`America/New_York`, `Asia/Tokyo`, etc.).
* `title`: URL‑encoded string.

### 📝 Via User Form:

If params are missing or invalid, the app renders a form:

* **Date & time selector** (`<input type="datetime-local">`)
* **Title input** (`<input type="text">`)
* Submitting the form updates the URL and re‑renders the countdown.

## ⚙️ Key Components

### `ViewController.jsx`

* Parses query params (`target_date`, `title`, `time_zone`), checks validity.
* Decides to render `<Countdown>` or the input form.
* Form automatically detects the user’s time zone using `Intl.DateTimeFormat().resolvedOptions().timeZone`.

### `Countdown.jsx`

* Accepts props: `targetDate` (Date object), `title` (string), `timeZone` (IANA time zone string).
* Uses the `timeZone` prop to convert the `targetDate` to UTC. This allows all calculations to be done relative to UTC.
* Uses `setInterval` to update remaining time every second.
* Ensures countdown text reflects the user's actual local time.

## 💡 Future Imporovements

* Daylight Saving Time is not currently handled. Future improvement could help the countdown timer account for DST adjustments.

## 📄 License

[MIT](https://github.com/seanbeirnes/js-countdown/blob/main/LICENSE)
