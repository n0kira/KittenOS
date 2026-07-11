// MeowSic App
const meowSicScreen = document.getElementById('meowSic');
const meowSicScreenClose = document.getElementById('meowSicClose');

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
        playButtonImage.src = "img/UIicons/pause.png";
    } else {
        audio.pause();
        isPlaying = false;
        playButtonImage.src = "img/UIicons/play.png";
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

meowSicScreenClose.addEventListener("click", () => {
    closeWindow(meowSicScreen);
    audio.pause();
    isPlaying = false;
    playButtonImage.src = "img/UIicons/play.png";
});


initializeWindow("meowSic");
