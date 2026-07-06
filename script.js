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

const pawNotesScreen = document.getElementById('pawNotes');
const pawNotesScreenClose = document.getElementById('pawNotesClose');

const pawPicsScreen =  document.getElementById('pawPics');
const pawPicsScreenClose = document.getElementById('pawPicsClose');

const meowSicScreen = document.getElementById('meowSic');
const meowSicScreenClose = document.getElementById('meowSicClose');

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

pawNotesScreenClose.addEventListener("click", () => {
    closeWindow(pawNotesScreen);
});

pawPicsScreenClose.addEventListener("click", () => {
    closeWindow(pawPicsScreen);
});

meowSicScreenClose.addEventListener("click", () => {
    closeWindow(meowSicScreen);
    audio.pause();
    isPlaying = false;
    playButtonImage.src = "img/play.png";
});

initializeWindow("welcome");
initializeWindow("pawNotes");
initializeWindow("pawPics");
initializeWindow("meowSic")

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


// PawNotes Code

let content = [
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
    let notesContent = document.getElementById('notesContent');
    notesContent.innerHTML = content[index].content;
}

setNotesContent(0);

let selectedNote = undefined;

function addToSideBar(index) {
    let sidebar = document.querySelector("#sidebar");
    let note = content[index];
    let newDiv = document.createElement("div");

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

// PawPics Code
const nextImgBtn = document.getElementById('pawPicsNext');
const prevImgBtn = document.getElementById('pawPicsPrev');
const picSlot = document.getElementById('pawPicsSlot');

let kittenImgs = 9;
let currentImg = 1;

nextImgBtn.addEventListener("click", showNextPic);
prevImgBtn.addEventListener("click", showPrevPic);

function showNextPic() {
    if (currentImg < kittenImgs) {
        currentImg++;
    } else {
        currentImg = 1;
    }
    picSlot.src = 'img/kitties/kit'+currentImg+'.jpg';
}

function showPrevPic() {
    if (currentImg > 1) {
        currentImg--;
    } else {
        currentImg = kittenImgs;
    }
    picSlot.src = 'img/kitties/kit'+currentImg+'.jpg';
}

// MeowSic App

let musicQueue = [
    {
        title: "Donut",
        author: "Lukrembo",
        totalLength: "2:24",
        path: "Donut"
    },
    {
        title: "Rose",
        author: "Lukrembo",
        totalLength: "2:43",
        path: "Rose"
    },
    {
        title: "This Is For You",
        author: "Lukrembo",
        totalLength: "3:03",
        path: "ThisIsForYou"
    },
    {
        title: "Honey Jam",
        author: "massobeats",
        totalLength: "2:13",
        path: "HoneyJam"
    },
    {
        title: "Gingersweet",
        author: "massobeats",
        totalLength: "2:36",
        path: "Gingersweet"
    },
    {
        title: "Chocolate",
        author: "Lukrembo",
        totalLength: "2:11",
        path: "Chocolate"
    }
]

const currentTimeTxt = document.getElementById('meowSicCurrentTime');
const totalTimeTxt = document.getElementById('meowSicTotalTime');
const titleTxt = document.getElementById('meowSicName');
const authorTxt = document.getElementById('meowSicAuthor');

const cover = document.getElementById('meowSicCover');

const prevButton = document.getElementById('previousSong');
const nextButton = document.getElementById('nextSong');
const playButton = document.getElementById('playSong');
const playButtonImage = document.getElementById('playPauseImage');

const audio = document.getElementById('meowSicTrack');

const timeSlider = document.getElementById('meowSicTimeSlider');

let isPlaying = false;
let counter = 0;
let currentSong = musicQueue[0];
let currentTime = 0;
let totalTime = currentSong.totalLength;

function updateSong(song) {
    totalTime = song.totalLength;
    totalTimeTxt.innerHTML = song.totalLength;
    titleTxt.innerHTML = song.title;
    authorTxt.innerHTML = song.author;
    cover.src = "img/music/" + song.path + ".webp";
    audio.src = "music/" + song.path + ".mp3";
    
    if (isPlaying) {
        audio.play()
    }
    
    let minsSec = totalTime.split(":");
    let mins = parseInt(minsSec[0]);
    mins = mins * 60;
    let secs = parseInt(minsSec[1]);

    timeSlider.max = mins + secs;
    timeSlider.style.background = 'linear-gradient(to right, rgb(212, 137, 196) 0%, rgba(186, 169, 186, 0.7) 0%)';
}

audio.addEventListener("timeupdate", () => {
    let time = audio.currentTime;
    let mins = Math.floor(time / 60);
    let secs = Math.floor(time % 60);

    timeSlider.value = mins * 60 + secs;

    const percentage = (audio.currentTime / audio.duration) * 100;
    timeSlider.style.background = `linear-gradient(to right, rgb(212, 137, 196) ${percentage}%, rgba(186, 169, 186, 0.7) ${percentage}%)`;

    if (secs < 10) {
        secs = "0" + secs.toString();
    } else {
        secs = secs.toString();
    }
    
    mins = mins.toString();
    currentTimeTxt.innerHTML = mins + ":" + secs;

    if (isPlaying) {
        if (currentTimeTxt.innerHTML === totalTime) {
            if (counter < musicQueue.length - 1) {
                counter++;
            } else {
                counter = 0;
            }
            updateSong(musicQueue[counter]);
        }
    }
});

timeSlider.addEventListener("input", () => {
    audio.currentTime = timeSlider.value;
});


playButton.addEventListener("click", () => {
    if (!isPlaying) {
        audio.play();
        isPlaying = true;
        playButtonImage.src = "img/pause.png";
    } else {
        audio.pause();
        isPlaying = false;
        playButtonImage.src = "img/play.png";
    }
});

nextButton.addEventListener("click", () => {
    if (counter < musicQueue.length - 1) {
            counter++;
    } else {
        counter = 0;
    }
    currentSong = musicQueue[counter];
    updateSong(currentSong);
    if (isPlaying) {
        audio.play();
    }
});

prevButton.addEventListener("click", () => {
    if (counter > 0) {
            counter--;
    } else {
        counter = musicQueue.length - 1;
    }
    currentSong = musicQueue[counter];
    updateSong(currentSong);
    if (isPlaying) {
        audio.play();
    }
});

updateSong(musicQueue[0])
