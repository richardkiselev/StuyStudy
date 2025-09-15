const importantDates = {
    "Last Day of School": new Date("June 26, 2026")
};

const frees = {
    "9": ["23;24", "Rosh Hashanah", "Rosh Hashanah"],
    "10": ["2;10;13;20", "Yom Kippur", "PSAT/NMSQT", "Italian Heritage and Indigenous Peoples' Day", "Diwali"],
    "11": ["4;11;27;28", "Election Day", "Veterans Day", "Thanksgiving", "Thanksgiving"],
    "12": ["24;25;26;27;28;29;30;31", "Winter Break"],
    "1": ["1;2;19;26", "Winter Recess", "Winter Recess", "Rev. Dr. Martin Luther King Jr. Day", "Professional Development Day"],
    "2": ["16;17;18;19;20", "Midwinter Recess"],
    "3": ["20", "Eid al-Fitr"],
    "4": ["2;3;6;7;8;9;10", "Spring Recess"],
    "5": ["25;27", "Memorial Day", "Eid al-Adha"],
    "6": ["4;19;26;27;28;29;30", "Anniversary Day/Staff Development", "Juneteenth", "Last Day Of School", "No School", "No School", "No School", "No School"],
    "7": ["All", "Summer Break"],
    "8": ["All", "Summer Break"]
};

function startEnd(start, end) {
    const dates = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
    }
    return dates;
}

const allDates = [];
const today = new Date();
for (const month in frees) {
    const firstEntry = frees[month][0];

    if (firstEntry === "All") {
        const year = parseInt(month) > 8 ? 2025 : 2026;
        allDates.push(
            ...startEnd(
                new Date(year, parseInt(month) - 1, 1),
                new Date(year, parseInt(month), 0)
            )
        );
    } else {
        const days = firstEntry.split(";");
        const year = parseInt(month) > 8 ? 2025 : 2026;
        for (const day of days) {
            allDates.push(new Date(year, parseInt(month) - 1, parseInt(day)));
            if (today > allDates.at(allDates.length - 1)) {
                allDates.pop();
            }
        }
    }
}


allDates.sort((a, b) => Math.abs(a - today) - Math.abs(b - today));
importantDates["No School"] = allDates[0];

let closestDate = allDates[0];
let minDiff = Math.abs(today - closestDate);

for (const date of allDates) {
    const diff = Math.abs(today - date);
    if (diff < minDiff) {
        closestDate = date;
        minDiff = diff;
    }
}

const container = document.getElementById("container");

for (const dateName in importantDates) {
    const element = document.createElement('div');
    element.id = "date-" + dateName.replace(/\s+/g, "-"); // unique id
    element.classList.add("date");
    if (dateName == "Last Day of School") element.classList.add("ldos");
    container.appendChild(element);

    function updateCountdown() {
        const now = new Date();
        let diff = Math.floor((importantDates[dateName] - now) / 1000); // seconds

        if (diff < 0) {
            element.innerText = `${dateName} has already passed!`;
            return;
        }

        const days = Math.floor(diff / (24 * 3600));
        diff %= 24 * 3600;
        const hours = Math.floor(diff / 3600);
        diff %= 3600;
        const minutes = Math.floor(diff / 60);
        const seconds = diff % 60;

        element.innerText =
            `${days}d ${hours}h ${minutes}m ${seconds}s until ${dateName} ` +
            `(${importantDates[dateName].toLocaleDateString()})`;
    }

    updateCountdown(); // initial render
    setInterval(updateCountdown, 1000);
}
