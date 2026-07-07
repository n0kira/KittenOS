let display = document.getElementById('display');
let prev = document.getElementById('prevMonth');
let next = document.getElementById('nextMonth');
let days = document.getElementById('days');

let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth();

function updateHeader() {
    let viewDate = new Date(year, month, 1);
    display.innerHTML = viewDate.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
    });
}

function displayCalendar() {
    days.innerHTML = "";
    const firstDay = new Date(year, month, 1);
    const firstDayIndex = firstDay.getDay(); 

    const lastDay = new Date(year, month + 1, 0);
    const numberOfDays = lastDay.getDate(); 

    for (let x = 1; x <= firstDayIndex; x++) {
        let div = document.createElement("div");
        div.innerHTML = "";
        days.appendChild(div);
    }

    for (let i = 1; i <= numberOfDays; i++) {
        let div = document.createElement("div");
        
        let date = new Date(year, month, i);
        div.dataset.date = date.toDateString();
        div.innerHTML = i;
        days.appendChild(div);

        if (date.getFullYear() === new Date().getFullYear() &&
            date.getMonth() === new Date().getMonth() &&
            date.getDate() === new Date().getDate()) {
            div.classList.add("currentDate");
        }
    }

    updateHeader();
}

prev.addEventListener("click", () => {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    displayCalendar();
});

next.addEventListener("click", () => {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    displayCalendar();
});

displayCalendar();
