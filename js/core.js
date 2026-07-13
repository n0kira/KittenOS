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

const hasVisited = localStorage.getItem("visited") || "false";

function closeWindow(element) {
    element.style.display = "none";
}

function openWindow(element) {
    element.style.display = "block";
    biggestIndex++;
    element.style.zIndex = biggestIndex;
}

if (hasVisited == "false") {
    welcomeScreen.style.display = "block";
}

welcomeScreenClose.addEventListener("click", () => {

    localStorage.setItem("visited", "true");
    closeWindow(welcomeScreen);
});

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
        if (element.id == "folder") {
            handleWindowTapFolder(element);
        } else {
            handleWindowTap(element);
        }
    });
}

function handleWindowTap(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    deselectIcon(selectedIcon);
}

function handleWindowTapFolder(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
}


function initializeWindow(elementName) {
    let screen = document.getElementById(elementName);
    addWindowTapHandling(screen);
    dragElement(screen);
}


// Add sound to all "buttons"

const closeButtons = document.querySelectorAll(`.closeButton`);
const closeAudio = new Audio();
closeAudio.src = "sound/tap_02.mp3";
closeAudio.preload = "auto";

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        closeAudio.pause();
        closeAudio.currentTime = 0;
        closeAudio.play();
    });
});

const openButtons = document.querySelectorAll(`.icon`);
const openAudio = new Audio();
openAudio.src = "sound/tap_05.mp3";
openAudio.preload = "auto";

openButtons.forEach(button => {
    button.addEventListener("click", () => {
        openAudio.pause();
        openAudio.currentTime = 0;
        openAudio.play();
    });
});

const uiButtons = document.querySelectorAll(`.uiButton`);
const uiAudio = new Audio();
uiAudio.src = "sound/tap_03.mp3";
uiAudio.preload = "auto";

uiButtons.forEach(button => {
    button.addEventListener("click", () => {
        uiAudio.pause();
        uiAudio.currentTime = 0;
        uiAudio.play();
    });
});

const calcButtons = document.querySelectorAll(`.pawCalcBtn`);
const calcAudio = new Audio();
calcAudio.src = "sound/type_04.mp3";
calcAudio.preload = "auto";

calcButtons.forEach(button => {
    button.addEventListener("click", () => {
        calcAudio.pause();
        calcAudio.currentTime = 0;
        calcAudio.play();
    });
});

const choiceButtons = document.querySelectorAll(`.uiChoice`);
const choiceAudio = new Audio();
choiceAudio.src = "sound/toggle_on.mp3";
choiceAudio.preload = "auto";

choiceButtons.forEach(button => {
    button.addEventListener("click", () => {
        choiceAudio.pause();
        choiceAudio.currentTime = 0;
        choiceAudio.play();
    });
});

const typeAudio = new Audio();
typeAudio.src = "sound/type_03.mp3";
typeAudio.preload = "auto";

document.addEventListener("input", (e) => {
    if (e.target.classList.contains("uiType")) {
        typeAudio.pause();
        typeAudio.currentTime = 0;
        typeAudio.play();
    }
});
