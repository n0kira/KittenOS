// PawPics Code
const pawPicsScreen =  document.getElementById('pawPics');
const pawPicsScreenClose = document.getElementById('pawPicsClose');

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

pawPicsScreenClose.addEventListener("click", () => {
    closeWindow(pawPicsScreen);
});


initializeWindow("pawPics");
