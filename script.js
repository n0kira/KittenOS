// Function to update the time each second'
function updateTime() {
    document.getElementById('time').innerHTML = new Date().toLocaleString();;
}

setInterval(updateTime, 1000);

// Function to make windows draggable

function dragElement(element) {
    var initialX = 0, initialY = 0; 
    var currentX = 0, currentY = 0;

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

        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

}

// Controls for the windows
var topbar = document.getElementById('topbar');

var welcomeScreen = document.getElementById('welcome');
var welcomeScreenClose = document.getElementById('welcomeClose');
var welcomeScreenOpen = document.getElementById('welcomeOpen');

var pawNotesScreen = document.getElementById('pawNotes');
var pawNotesScreenClose = document.getElementById('pawNotesClose');

function closeWindow(element) {
    element.style.display = "none";
}

function openWindow(element) {
    element.style.display = "block";
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topbar.style.zIndex = biggestIndex+1;
}

welcomeScreenClose.addEventListener("click", function() {
    closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
})

pawNotesScreenClose.addEventListener("click", () => {
    closeWindow(pawNotesScreen)
});


// App Selection
var selectedIcon = undefined;

function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element;
}

function deselectIcon(element) {
    element.classList.remove("selected");
    selectedIcon = undefined;
}

function handleIconTap(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element);
        openWindow(pawNotesScreen);
    } else {
        selectIcon(element);
    }
}

// Focus windows
var biggestIndex = 1;

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () => {
        handleWindowTap(element);
    })
}

function handleWindowTap(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topbar.style.zIndex = biggestIndex+1;
    deselectIcon(selectedIcon);
}


function initializeWindow(elementName) {
    var screen = document.getElementById(elementName);
    addWindowTapHandling(screen);
    dragElement(screen);
}

initializeWindow("welcome");
initializeWindow("pawNotes");


var content = [
    {
        title: "Welcome",
        date: "03/07/2026",
        content: `
            <p contenteditable="true">
                Welcome to PawNotes, the incredible note taking app for cats!
                Here you will find many notes...
                <br>
                It could be:
                <br>
                > Favorite <b>food</b>... <i>Yummy</i>
                <br>
                > Favorite <b>hobbies</b>!
                <br>
                > <b>Feelings</b> :D
                <br>
                Or...
                <br>
                Anything!!!
            </p>
        `
    },
    {
        title: "About Me",
        date: "03/07/2026",
        content: `
            <p>
                Hello again!
                <br>
                I am <b>nokira</b>, a high school student from Italy!
                <br>
                I'm really enjoyin this journey because it's chellenging but so rewarding! I am learning many new things and building actual websites :D
            </p>
        `
    },
    {
        title: "Fun Fact",
        date: "04/07/2026",
        content: `
            <p>
                Hello!
                <br>
                If you wanted to know, my favorite food is... hmm... it's a <i>secret</i>
                
            </p>
        `
    }
]

function setNotesContent(index) {
    var notesContent = document.getElementById('notesContent');
    notesContent.innerHTML = content[index].content;
}

setNotesContent(0);

var selectedNote = undefined;

function addToSideBar(index) {
    var sidebar = document.querySelector("#sidebar");
    var note = content[index];
    var newDiv = document.createElement("div");

    newDiv.style.color = "black";
    newDiv.style.cursor = "pointer";
    
    newDiv.innerHTML = `
        <p style="margin: 0px;">
        ${note.title}
        </p>
        <p style="font-size: 12px; margin: 0px;">
        ${note.date}
        </p>
    `;

    newDiv.addEventListener("click", function() {
        setNotesContent(index);
        
        if (selectedNote !== undefined) {
            selectedNote.style.color = "black";
        }

        newDiv.style.color = "rgb(124, 18, 124)";
        selectedNote = newDiv;
    });
    
    sidebar.appendChild(newDiv);
}


for (let i = 0; i < content.length; i++) {
    addToSideBar(i)
}
