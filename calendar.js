const monthYear = document.getElementById('month-year');
const calendarGrid = document.getElementById('calendar-grid');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentDate = new Date();

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const frees = {
    "9": ["23;24", "Rosh Hashanah", "Rosh Hashanah"],
    "10": ["2;10;13;20", "Yom Kippur", "PSAT/NMSQT (11th graders only)", "Italian Heritage and Indigenous Peoples' Day", "Diwali"],
    "11": ["4;11;27;28", "Election Day", "Veterans Day", "Thanksgiving", "Thanksgiving"],
    "12": ["24;25;26;27;28;29;30;31", "Winter Break"],
};
function renderCalendar(date) {
    calendarGrid.innerHTML = '';

    // Render day headers
    for (let day of daysOfWeek) {
        const header = document.createElement('div');
        header.classList.add('day-header');
        header.textContent = day;
        calendarGrid.appendChild(header);
    }

    const year = date.getFullYear();
    const month = date.getMonth();
    monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Empty cells for first week
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        calendarGrid.appendChild(empty);
    }
    let dayType = "A";
    // Render days
    for (let day = 1; day <= lastDate; day++) {
        if (day == 1 && month > 8) dayType = dayType == "A" ? "B" : "A";
        const daz = new Date(year, month, day);
        const dayCell = document.createElement('div');
        let freeDays = frees[String(month + 1)][0].split(";");
        let freeNames = frees[String(month + 1)].slice(1);
        let holidayName = "";
        if (freeDays.length > 1 && freeNames.length == 1) {
            holidayName = freeNames[0];
        } else {
            Array(freeDays).map(_ => {
                holidayName = freeNames[freeDays.findIndex(d => d == day)];
            });
        }

        let isHoliday = freeDays.includes(String(day));

        const notWork = (isHoliday ? true : (((daz.getDate() <= 3) && (daz.getMonth() == 8)) || (daz.getDay() == 0 || daz.getDay() == 6)));
        console.log(notWork, isHoliday, 'for', daz.toString());
        dayCell.className = `day${(isHoliday ? ' holiday' : '')}`;
        dayCell.innerHTML = `<span>${String(day)}</span>` + (notWork === true ? "" : `<span>${dayType}-Day</span>`) + (isHoliday === true ? `<span class="holiday-text">${holidayName} (No School)</span>` : "");
        calendarGrid.appendChild(dayCell);
        if (notWork !== true) {
            if (dayType == "A") dayType = "B";
            else if (dayType == "B") dayType = "A";
        }
    }
}

prevBtn.addEventListener('click', () => {
    if ((currentDate.getMonth() > 8 && currentDate.getFullYear() > 2024) || (currentDate.getFullYear() > 2025))
        currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

// Initialize
renderCalendar(currentDate);
