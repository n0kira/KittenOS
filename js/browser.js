const pawNetScreen = document.getElementById('pawNet');
const pawNetScreenClose = document.getElementById('pawNetClose');

const searchButtons = document.querySelectorAll(`.searchButton`);
const webFrame = document.getElementById('webContent');

searchButtons.forEach(button => {
    button.addEventListener("click", () => {
        const link = "https://" + button.innerHTML;
        webFrame.src = link;
    });
});

pawNetScreenClose.addEventListener("click", () => {
    closeWindow(pawNetScreen);
});

initializeWindow("pawNet");
