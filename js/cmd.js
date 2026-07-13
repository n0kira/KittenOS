// PawCmd Code

const pawCmdScreen = document.getElementById('pawCmd');
const pawCmdScreenClose = document.getElementById('pawCmdClose');

const cmdInput = document.getElementById('pawCmdInput');
const cmdPrompt = document.getElementById('cmdPrompt');
const cmdOutput = document.getElementById('pawCmdOutput');
const pawCmdContent = document.getElementById('pawCmdContent');

const celebAudio = new Audio();
celebAudio.src = "sound/celebration.mp3";
celebAudio.volume = 0.3;

const failAudio = new Audio();
failAudio.src = "sound/caution.mp3";
failAudio.volume = 0.3;

cmdPrompt.innerHTML = user + "@kittenOs $>";

pawCmdContent.addEventListener("click", () => {
    cmdInput.focus();
});

cmdInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();

        const commandText = cmdInput.textContent.trim();
        if (commandText == "") return;

        const param = commandText.split(" ")[1];
        const command = commandText.split(" ")[0].toLowerCase();

        if (command == "help" && !param) {
            celebAudio.play();
            printTerminal("Hi!! Here are all commands:\n- help\n- hello\n- cat\n- echo [text]\n- whoami\n- clear");
        } else if (command == "hello" && !param) {
            celebAudio.play();
            printTerminal("Hello! Welcome to PawCmd :)");
        } else if (command == "cat" && !param) {
            celebAudio.play();
            printTerminal("(=^.^=) .... meow");
        } else if (command == "clear" && !param) {
            celebAudio.play();
            cmdOutput.innerHTML = "";
        } else if (command == "echo" && param) {
            celebAudio.play();
            printTerminal(param);
        } else if (command == "whoami" && !param) {
            celebAudio.play();
            printTerminal(`You are ${user} !!`);
        } else {
            failAudio.play();
            printTerminal(`Command - ${command} - not found! Type help for available commands`);
        }

        cmdInput.textContent = "";
    }
});

function printTerminal(cmd) {
    cmdOutput.innerHTML = cmd;
}

pawCmdScreenClose.addEventListener("click", () => closeWindow(pawCmdScreen));

initializeWindow("pawCmd");
