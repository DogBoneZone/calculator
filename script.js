// Declarations
const calcDisplay = document.querySelector("#calcDisplay");
const topButtonRow = document.querySelector("#topButtonRow");
const operatorButtons = document.querySelector("#operators");
const digitBtns = document.querySelector("#digits");
const divisionSymbol = String.fromCharCode(246);
const clearButtonArray = ["Delete", "Clear"];
const operatorArray = ["add", "subtract", "multiply", "divide"];
const digitArray = [7, 8, 9, 4, 5, 6, 1, 2, 3, ".", 0, "="];

// Create buttons
const createClearButtons = () => {
    for (let command of clearButtonArray) {
        let btn = document.createElement("button");
        btn.setAttribute("id", `${command.toLowerCase()}`);
        btn.textContent = `${command.toUpperCase()}`;
        topButtonRow.appendChild(btn);

        btn.addEventListener("click", (event) => {
            let stringArray = [...calcDisplay.textContent];
            let length = stringArray.length - 1;

            if (command === "Clear") {
                calcDisplay.textContent = 0;
            }
            if (command === "Delete") {
                if (stringArray.length > 1) {
                    calcDisplay.textContent = stringArray.splice(1, length).join('');
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

        btn.addEventListener("click", (event) => {
            if (btn === "=") {
                //NEED TO FIND OUT HOW TO EVALUATE A STRING
            }
            if (calcDisplay.textContent == 0) {
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
        btn.style.padding = "10px";

        if (operator === "add") {
            btn.textContent = "+";
            btn.addEventListener("click", () => {
                let stringArray = [...calcDisplay.textContent];
                let length = stringArray.length -1;
                if (stringArray[length] !== '+') {
                    calcDisplay.textContent += btn.textContent;
                }
            })
        } else if (operator === "subtract") {
            btn.textContent = "-";
        } else if (operator === "multiply") {
            btn.textContent = "x";
        } else if (operator === "divide") {
            btn.textContent = divisionSymbol;
        }

        operatorButtons.appendChild(btn);
}};

createClearButtons();
createDigitButtons();
createOperatorButtons();