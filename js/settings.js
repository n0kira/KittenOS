// PawConfig Code
const pawConfigScreen = document.getElementById('pawConfig');
const pawConfigScreenClose = document.getElementById('pawConfigClose');

pawConfigScreenClose.addEventListener("click", () => closeWindow(pawConfigScreen));

// Local time and format preference
const normalFormatBtn = document.getElementById('format24h');
const americanFormatBtn = document.getElementById('format12h');

let savedFormat = localStorage.getItem("kittenOS-hourFormat");

let format12 = savedFormat == "true";

if (format12) {
    americanFormatBtn.checked = true;
} else {
    normalFormatBtn.checked = true;
}

function updateTime() {

    format12 = !normalFormatBtn.checked;

    let date = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: format12
    });
    document.getElementById('time').innerHTML = date;

    localStorage.setItem("kittenOS-hourFormat", format12);
}

normalFormatBtn.addEventListener("change", updateTime);
americanFormatBtn.addEventListener("change", updateTime);

updateTime();
setInterval(updateTime, 60000);

// Show date in topbar
const showDateBtn = document.getElementById('showDate');
const dateText = document.getElementById('date');

dateText.innerHTML = new Date().toLocaleDateString();

if (showDateBtn.checked) {
    dateText.style.visibility = "visible";
} else {
    dateText.style.visibility = "hidden";
}

showDateBtn.addEventListener("change", () => {
    if (showDateBtn.checked) {
        dateText.style.visibility = "visible";
    } else {
        dateText.style.visibility = "hidden";
    }
});

// Edit Username
const userField = document.getElementById('usernameField');
let user = localStorage.getItem("kittenOS-user") || "User";
userField.innerHTML = user;

userField.addEventListener("input", () => {
    if (userField.textContent.length > 15) {
        userField.textContent = userField.textContent.substring(0, 15);
    }
    
    if (userField.textContent.trim().length > 0) {
        user = userField.textContent;
        localStorage.setItem("kittenOS-user", user);
        greetUser();
    }
});

userField.addEventListener("blur", () => {
    if (userField.textContent.trim().length === 0) {
        user = "User";
        userField.textContent = user;
        localStorage.setItem("kittenOS-user", user);
        greetUser();
    }
});

// Date of Birth
const birthdateInput = document.getElementById('birthdate');

let savedBirthdate = localStorage.getItem("kittenOS-birthdate");
let birthday = null;
let birthmonth = null;

if (savedBirthdate) {
    birthdateInput.value = savedBirthdate;
    birthday = new Date(savedBirthdate).getDate();
    birthmonth = new Date(savedBirthdate).getMonth();
} 

// birthdateInput.addEventListener("change", function(element) {
//     let date = element.target.value;
//     localStorage.setItem("kittenOS-birthdate", date); 

//     birthday = new Date(date).getDate();
//     birthmonth = new Date(date).getMonth();

//     greetUser();
// });

flatpickr("#birthdate", {
    dateFormat: "Y-m-d",
    defaultDate: savedBirthdate || "1999-12-31",
    onChange: function(selectedDates, dateStr) {
        localStorage.setItem("kittenOS-birthdate", dateStr);

        birthday = new Date(dateStr).getDate();
        birthmonth = new Date(dateStr).getMonth();

        greetUser();
        displayCalendar();
    }
})


// Greeting Message for User
function greetUser() {
    const greetingTxt = document.getElementById('greetings');

    let today = new Date();

    if (birthday == today.getDate() && birthmonth == today.getMonth()) {
        greetingTxt.innerHTML = `Happy Birthday, ${user} 🥳`
    } else {
        let logHour = new Date().getHours();
        if (logHour >= 6 && logHour < 12) {
            greetingTxt.innerHTML = `Good morning, ${user}.`;
        } else if (logHour >= 12 && logHour < 18) {
            greetingTxt.innerHTML = `Good afternoon, ${user}.`;
        } else if (logHour >= 18 && logHour < 21) {
            greetingTxt.innerHTML = `Good evening, ${user}.`;
        } else {
            greetingTxt.innerHTML = `Good night, ${user}.`;
        }
    }
}
greetUser();

// Edit Profile Picture
const editBtn = document.getElementById('editPfp');
const pfpInput = document.getElementById('pfpInput');
const pfp = document.getElementById('pfp');

editBtn.addEventListener("click", () => pfpInput.click());

pfpInput.addEventListener("change", function(element) {
    let file = element.target.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function(event) {
        let base64String = event.target.result;
        pfp.src = base64String;
        localStorage.setItem("kittenOS-pfp", base64String);
    };
    reader.readAsDataURL(file);
});

let savedPfp = localStorage.getItem("kittenOS-pfp");
if (savedPfp) {
    pfp.src = savedPfp;
}

// Edit background

const body = document.body;
const backgroundBtn = document.getElementById('editBackground');
const backgroundInp = document.getElementById('backgroundInput');
const resetBtn = document.getElementById('resetBackground');

resetBtn.addEventListener("click", () => {
    body.style.backgroundImage = "url('img/live-background.gif')"
});

backgroundBtn.addEventListener("click", () => backgroundInp.click())

backgroundInp.addEventListener("change", function(element) {
    let file = element.target.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function(event) {
        let base64String = event.target.result;
        if (base64String.length >= 4_000_000) {
            alert("Image is too big! Try another one :)");
            return
        }
        body.style.backgroundImage = `url(${base64String})`;
        localStorage.setItem("kittenOS-Background", base64String);
    };
    reader.readAsDataURL(file);
});

let savedBackground = localStorage.getItem("kittenOS-Background");
if (savedBackground) {
    body.style.backgroundImage = `url(${savedBackground})`;
}

initializeWindow("pawConfig");
