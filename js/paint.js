// Paw Paint Code
const pawPaintScreen = document.getElementById('pawPaint');
const pawPaintScreenClose = document.getElementById('pawPaintClose');

const canvas = document.getElementById('drawingBoard');
const toolbar = document.getElementById('pawPaintToolbar');
const context = canvas.getContext("2d");

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let isPainting = false;
let lineWidth = 5;
let startX, statY;

let undoArr = [];
let redoArr = [];

function saveState() {
    undoArr.push(context.getImageData(0, 0, canvas.width, canvas.height));
    redoArr = [];
}

function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const color = document.getElementById('stroke');
    color.value = "#000000";
    context.strokeStyle = "#000000";

    undoArr = [];
    redoArr = [];
    saveState();
}

toolbar.addEventListener("click", (e) => {
    if (e.target.id == "clear") {
        context.clearRect(0, 0, canvas.width, canvas.height);
        saveState();
    }

    if (e.target.id == "savePng") {
        const img = canvas.toDataURL("image/png");
    
        const downloadLink = document.createElement("a");
        downloadLink.href = img;
        downloadLink.download = "my-PawPrint.png";
        downloadLink.click();
    }

    if (e.target.id == "undoBtn") {
        if (undoArr.length > 1) {
            redoArr.push(undoArr.pop());
            let previousState = undoArr[undoArr.length - 1];
            context.putImageData(previousState, 0, 0);
        }
    }

    if (e.target.id == "redoBtn") {
        if (redoArr.length > 0) {
            let nextState = redoArr.pop();
            undoArr.push(nextState)
            context.putImageData(nextState, 0, 0);
        }
    }
});

toolbar.addEventListener("change", (e) => {
    if (e.target.id == "stroke") {
        context.strokeStyle = e.target.value;
    } 

    if (e.target.id == "lineWidth") {
        lineWidth = e.target.value;
    }

});

function getCanvasCoords(e) {
    let container = canvas.getBoundingClientRect();

    let mouseX = e.clientX - container.left;
    let mouseY = e.clientY - container.top;

    return {x:mouseX, y:mouseY};
}

function draw(e) {
    if (!isPainting) {
        return;
    }

    context.lineWidth = lineWidth;
    context.lineCap = "round";

    let coords = getCanvasCoords(e);
    context.lineTo(coords.x, coords.y);
    context.stroke();
};

canvas.addEventListener("mousedown", (e) => {
    isPainting = true;

    context.beginPath();
    let coords = getCanvasCoords(e);
    context.moveTo(coords.x, coords.y);
});

canvas.addEventListener("mouseup", (e) => {
    isPainting = false;
    saveState();
});

canvas.addEventListener("mousemove", draw);

pawPaintScreenClose.addEventListener("click", () => closeWindow(pawPaintScreen));

initializeWindow("pawPaint");
