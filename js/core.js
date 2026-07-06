// Function to update the time each second'
function updateTime() {
    let date = new Date().toLocaleTimeString().split(":");
    let hours = date[0];
    let mins = date[1];
    document.getElementById('time').innerHTML = hours + ":" + mins;
}

setInterval(updateTime, 1000);

// Greeting Message for User
const greetingTxt = document.getElementById('greetings');

let logHour = new Date().getHours();

if (logHour >= 6 && logHour < 12) {
    greetingTxt.innerHTML = "Good morning, User.";
} else if (logHour >= 12 && logHour < 18) {
    greetingTxt.innerHTML = "Good afternoon, User.";
} else if (logHour >= 18 && logHour < 21) {
    greetingTxt.innerHTML = "Good evening, User.";
} else {
    greetingTxt.innerHTML = "Good night, User.";
}

// Function to make windows draggable

function dragElement(element) {
    let initialX = 0, initialY = 0; 
    let currentX = 0, currentY = 0;

    if (document.getElementById(element.id + "Header")) {
        document.getElementById(element.id + "Header").onmousedown = startDragging;
    } else {
        element.onmousedown = startDragging;
    }

    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();

        initialX = e.clientX;
        initialY = e.clientY;

        document.onmouseup = stopDragging;
        document.onmousemove = dragElement;
    }

    function dragElement(e) {
        e = e || window.event;
        e.preventDefault();

        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;

        initialX = e.clientX;
        initialY = e.clientY;

        let top = element.offsetTop - currentY;
        let left = element.offsetLeft - currentX;
        
        if (top < 230) {
            top = 230;
        }

        if (top > window.innerHeight - 155) {
            top = window.innerHeight - 155;
        }

        if (left > window.innerWidth - 300 ) {
            left = window.innerWidth - 300;
        }

        if (left < 300) {
            left = 300;
        }

        element.style.top = top + "px";
        element.style.left = left + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

}

// Controls for the windows
const topbar = document.getElementById('topbar');

const welcomeScreen = document.getElementById('welcome');
const welcomeScreenClose = document.getElementById('welcomeClose');
const welcomeScreenOpen = document.getElementById('welcomeOpen');

function closeWindow(element) {
    element.style.display = "none";
}

function openWindow(element) {
    element.style.display = "block";
    biggestIndex++;
    element.style.zIndex = biggestIndex;
}

welcomeScreenClose.addEventListener("click", function() {
    closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
})

initializeWindow("welcome");

// App Selection
let selectedIcon = undefined;

function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element;
}

function deselectIcon(element) {
    if (!element) return;
    element.classList.remove("selected");
    selectedIcon = undefined;
}

function handleIconTap(element, appName) {
    if (element.classList.contains("selected")) {
        deselectIcon(element);
        if(appName) {
            openWindow(appName);
        } else {
            console.log("Cant open app: " + appName);
        }
    } else {
        selectIcon(element);
    }
}

// Focus windows
let biggestIndex = 1;

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () => {
        handleWindowTap(element);
    })
}

function handleWindowTap(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    deselectIcon(selectedIcon);
}


function initializeWindow(elementName) {
    let screen = document.getElementById(elementName);
    addWindowTapHandling(screen);
    dragElement(screen);
}
