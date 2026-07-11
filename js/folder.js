const folderScreen = document.getElementById('folder');
const folderScreenClose = document.getElementById('folderClose');

folderScreenClose.addEventListener("click", () => {
    closeWindow(folderScreen);
});

initializeWindow("folder");
