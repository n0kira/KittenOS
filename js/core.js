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
        document.onmousemove = moveElement;
    }

    function moveElement(e) {
        e = e || window.event;
        e.preventDefault();

        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;

        initialX = e.clientX;
        initialY = e.clientY;

        let top = element.offsetTop - currentY;
        let left = element.offsetLeft - currentX;
        
        if (top < 0) top = 0;
        if (top + element.offsetHeight > window.innerHeight) {
            top = window.innerHeight - element.offsetHeight;
        }
        
        if (left < 0) left = 0;
        if (left + element.offsetWidth > window.innerWidth) {
            left = window.innerWidth - element.offsetWidth;
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

welcomeScreenClose.addEventListener("click", () => closeWindow(welcomeScreen));

welcomeScreenOpen.addEventListener("click", () => openWindow(welcomeScreen));

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
