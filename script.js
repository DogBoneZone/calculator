// Declarations
const calcDisplay = document.querySelector("#calcDisplay");
const topButtonRow = document.querySelector("#topButtonRow");
const operatorButtons = document.querySelector("#operators");
const digitBtns = document.querySelector("#digits");
const divisionSymbol = String.fromCharCode(246);
const clearButtonArray = ["Delete", "Clear"];
const operatorArray = ["+", "-", "x", "divide"];
const digitArray = [7, 8, 9, 4, 5, 6, 1, 2, 3, ".", 0, "="];

// Create buttons
const createClearButtons = () => {
    for (let command of clearButtonArray) {
        let btn = document.createElement("button");
        btn.setAttribute("id", `${command.toLowerCase()}`);
        btn.textContent = `${command.toUpperCase()}`;
        topButtonRow.appendChild(btn);

        btn.addEventListener("click", () => {
            let stringArray = [...calcDisplay.textContent];
            let length = stringArray.length -1;

            if (command === "Clear") {
                calcDisplay.textContent = 0;
            }
            if (command === "Delete") {
                if (length > 0) {
                    calcDisplay.textContent = stringArray.splice(0, length).join('');
                } else {
                    calcDisplay.textContent = 0;
                }
            }
        })
    }};

const createDigitButtons = () => {
    for (let digit of digitArray) {
        let btn = document.createElement("button");
        btn.setAttribute("id", `btn${digit}`);
        btn.textContent = `${digit}`;
        digitBtns.appendChild(btn);

        btn.addEventListener("click", () => {
            if (btn.id === 'btn=') {
                evaluateString();
            }
            else if (calcDisplay.textContent == 0) {
                calcDisplay.textContent = digit;
            } else {
                calcDisplay.textContent += digit;
            }
        });
}};

const createOperatorButtons = () => {
    for (let operator of operatorArray) {
        let btn = document.createElement("button");
        btn.setAttribute("id", `${operator}`);
        btn.textContent = operator;
        btn.style.padding = "10px";

        btn.addEventListener("click", () => {
            let stringArray = [...calcDisplay.textContent];
            let length = stringArray.length - 1;
            if (stringArray[length] !== operator) {
                calcDisplay.textContent += btn.textContent;
            }
        })
    operatorButtons.appendChild(btn);
}};

const evaluateString = () => {
    let inputArray = [...calcDisplay.textContent];
    const parser = (value1, value2) => {
        console.log(value1.type)
    }

    inputArray.reduce(parser);
}

// Button Call Functions
createClearButtons();
createDigitButtons();
createOperatorButtons();