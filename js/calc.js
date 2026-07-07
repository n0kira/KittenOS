// PawCalc Code
const pawCalcScreen = document.getElementById('pawCalc');
const pawCalcScreenClose = document.getElementById('pawCalcClose');
const resultTxt = document.getElementById('pawCalcResult');

const numButtons = document.querySelectorAll(".pawCalcNum");
const opButtons = document.querySelectorAll(".pawCalcOperand");
const equalsButton = document.getElementById('pawCalcEquals');
const clearButton = document.getElementById('pawCalcClear');
const delButton = document.getElementById('pawCalcDelete');

let currentEquation = "";

clearButton.addEventListener("click", () => {
    currentEquation = "";
    resultTxt.innerHTML  = "=D";
});

delButton.addEventListener("click", () => {
    currentEquation = currentEquation.slice(0, -1);
    resultTxt.innerHTML = currentEquation;
});

equalsButton.addEventListener("click", () => {
    try {
        let result = new Function(`return ${currentEquation}`)();
        resultTxt.innerHTML = result;
        currentEquation = result;
        fixText();
    } catch {
        resultTxt.innerHTML = "Error";
    }
});

numButtons.forEach(button => {
    button.addEventListener("click", (element) => {
        if (currentEquation.length >= 15) return;
        let num = element.target.innerText;
        
        currentEquation += num;
        resultTxt.innerText = currentEquation;
        fixText();
    });
});

opButtons.forEach(button => {
    button.addEventListener("click", (element) => {
        if (currentEquation.length >= 15) return;
        let op = element.target.innerText;

        currentEquation += op;
        resultTxt.innerHTML = currentEquation;
        fixText();
    });
});

function fixText() {
    let txtLength = resultTxt.innerText.length;

    if (txtLength >= 13) {
        resultTxt.style.fontSize = "1.5rem";
    } else if (txtLength >= 10) {
        resultTxt.style.fontSize = "2rem";
    } else {
        resultTxt.style.fontSize = "2.5rem";
    }
}


pawCalcScreenClose.addEventListener("click", () => closeWindow(pawCalcScreen));

initializeWindow("pawCalc");

