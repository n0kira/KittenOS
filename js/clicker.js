const pawGameScreen = document.getElementById('pawGame');
const pawGameScreenClose = document.getElementById('pawGameClose');

const gameWindow = document.getElementById('pawGameContent');
const scoreText = document.getElementById('pawGameScore');

const yarnColors = ["blue", "gray", "green", "orange", "red"];

let score = parseFloat(localStorage.getItem("pawGameScore")) || 0;
scoreText.innerHTML = `Total Yarn: ${score.toFixed(1)}`;

const playGameButton = document.getElementById('pawGameStart');;
let isGamePlaying = false;

playGameButton.addEventListener("click", () => {
    isGamePlaying = true;
    playGameButton.style.display = "none";
    yarnColors.forEach(yarnColor => {
        for (let i = 0; i < 5; i++) {
            const yarnImg = gameWindow.appendChild(document.createElement("img"));
            
            yarnImg.style.position = "absolute";
            yarnImg.src = `img/yarn/${yarnColor}.png`;
            yarnImg.style.visibility = "hidden";

            switch(yarnColor) {
                case "blue":
                    yarnImg.style.width = "50p  Q`1S6x";
                    yarnImg.style.height = "50px";
                    yarnImg.dataset.mult = 1;
                    break;
                case "gray":
                    yarnImg.style.width = "40px";
                    yarnImg.style.height = "40px";
                    yarnImg.dataset.mult = 1.7;
                    break;
                case "green":
                    yarnImg.style.width = "25px";
                    yarnImg.style.height = "25px";
                    yarnImg.dataset.mult = 2;
                    break;
                case "orange":
                    yarnImg.style.width = "65px";
                    yarnImg.style.height = "65px";
                    yarnImg.dataset.mult = 0.6;
                    break;
                case "red":
                    yarnImg.style.width = "10px";
                    yarnImg.style.height = "10px";
                    yarnImg.dataset.mult = 10;
                    break;
            }

            yarnImg.addEventListener("click", () => scoring(yarnImg));
            spawnYarn(yarnImg);
            setInterval(spawnYarn, 5000, yarnImg);
        }
    });
});

function spawnYarn(element) {

    if (isGamePlaying) {
        const x = Math.random() * (gameWindow.clientWidth - element.clientWidth);
        const y = Math.random() * (gameWindow.clientHeight - element.clientHeight);
    
        element.style.visibility = "visible";
        element.style.left = x + "px";
        element.style.top = y + "px";
    } else {

    }
}

function scoring(element) {
    const multiplier = element.dataset.mult;

    element.style.visibility = "hidden";
    score += 1 * multiplier;
    scoreText.innerHTML = `Total Yarn: ${score.toFixed(1)}`;
    localStorage.setItem("pawGameScore", score);
}

pawGameScreenClose.addEventListener("click", () => {
    closeWindow(pawGameScreen);
    isGamePlaying = false;
    playGameButton.style.display = "block";

    gameWindow.querySelectorAll("img").forEach(img => img.remove(img));
});
initializeWindow("pawGame");
