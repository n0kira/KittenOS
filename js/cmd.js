// PawCmd Code

const pawCmdScreen = document.getElementById('pawCmd');
const pawCmdScreenClose = document.getElementById('pawCmdClose');

const cmdInput = document.getElementById('pawCmdInput');
const cmdPrompt = document.getElementById('cmdPrompt');
const cmdOutput = document.getElementById('pawCmdOutput');
const pawCmdContent = document.getElementById('pawCmdContent');

cmdPrompt.innerHTML = user + "@kittenOs $>";

pawCmdContent.addEventListener("click", () => {
    cmdInput.focus();
});

cmdInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();

        const commandText = cmdInput.textContent.trim();
        if (commandText == "") return;

        const command = commandText.toLocaleLowerCase();

        switch(command) {
            case "help":
                printTerminal("Hi!! Here are all commands:\nhelp\nhello\ncat\nclear");
                break;
            case "hello":
                printTerminal("Hello! Welcome to PawCmd :)");
                break;
            case "cat":
                printTerminal("(=^.^=) .... meow");
                break;
            case "clear":
                cmdOutput.innerHTML = "";
                break;
            default:
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
