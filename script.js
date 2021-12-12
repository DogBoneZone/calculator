// Declarations
const calcOutput = document.querySelector("#calcOutput");
const calcHistory = document.querySelector("#calcHistory");
const topButtonRow = document.querySelector("#topButtonRow");
const operatorButtons = document.querySelector("#operators");
const digitBtns = document.querySelector("#digits");
const clearButtonArray = ["Delete", "Clear"];
const operatorArray = ["+", "-", "x", "÷"];
const digitArray = [7, 8, 9, 4, 5, 6, 1, 2, 3, ".", 0, "="];
const regex = /[+-x÷]/
let num1;
let num2;
let operatorIndex;

// Create buttons
const createClearButtons = () => {
    for (let command of clearButtonArray) {
        let btn = document.createElement("button");
        btn.setAttribute("id", `${command.toLowerCase()}`);
        btn.textContent = `${command.toUpperCase()}`;
        topButtonRow.appendChild(btn);

        btn.addEventListener("click", () => {
            let stringArray = [...calcOutput.textContent];
            let length = stringArray.length -1;

            if (command === "Clear") {
                calcHistory.textContent = 0;
                calcHistory.style.visibility = 'hidden';
                calcOutput.textContent = 0;
            }
            if (command === "Delete") {
                if (length > 0) {
                    if (stringArray[length].match(regex)) {
                        resetStoredValues();
                    }
                    calcOutput.textContent = stringArray.splice(0, length).join('');
                } else {
                    calcOutput.textContent = 0;
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

        if (btn.id === 'btn.'||btn.id === 'btn=') {
            btn.classList = 'operator';
        }

        if (btn.id !== 'btn=') {
            btn.addEventListener("click", () => {
                let stringArray = [...calcOutput.textContent];
                let length = stringArray.length - 1;

                if (operatorIndex === undefined) {
                    if (calcOutput.textContent == 0||calcOutput.textContent == '') {
                        calcOutput.textContent = digit;
                    } else if (stringArray.slice(0, length + 1).some(checkDecimals) && btn.id == 'btn.') {
                        console.log("Number already contains a decimal")
                    } else {
                        calcOutput.textContent += digit;
                    }
                }

                else if (operatorIndex !== undefined) {
                    if (stringArray.slice(operatorIndex+1, length + 1).some(checkDecimals) && btn.id == 'btn.') {
                        console.log("Number already contains a decimal")
                    } else {
                        calcOutput.textContent += digit;
                    }
                }
            })
        } else {
            btn.addEventListener("click", () => {
                if (operatorIndex !== undefined) {
                    setNum2();
                    calcHistory.textContent = calcOutput.textContent + ' = ';
                    calcHistory.style.display = "visible";
                    calcOutput.textContent = evaluateString(num1, num2);
                }
            })
        }
}};

const createOperatorButtons = () => {
    for (let operator of operatorArray) {
        let btn = document.createElement("button");
        btn.setAttribute("id", `btn${operator}`);
        btn.classList = 'operator';
        btn.textContent = operator;
        btn.style.padding = "10px";

        btn.addEventListener("click", () => {
            let stringArray = [...calcOutput.textContent];
            let length = stringArray.length - 1;

            if (num1 !== undefined && num2 !== undefined) {
                calcOutput.textContent = evaluateString(num1, num2);

            } else if (stringArray[length] !== '=' && num1 === undefined && num2 === undefined && calcOutput.textContent != 0) {
                calcOutput.textContent += btn.textContent;
                operatorIndex = length + 1;
                setNum1();
            } else if (operatorIndex !== undefined) {
                setNum2();
                calcHistory.textContent = calcOutput.textContent + ' = ';
                calcOutput.textContent = evaluateString(num1, num2);
            }
        });

    operatorButtons.appendChild(btn);
}};

const evaluateString = (a, b) => {
    let stringArray = [...calcOutput.textContent];
    let output;

    if (stringArray[operatorIndex] === '+') {
        output = Math.round((a + b) * 1000) / 1000;
    } else if (stringArray[operatorIndex] === '-') {
        output = Math.round((a - b) * 1000) / 1000;
    } else if (stringArray[operatorIndex] === 'x') {
        output = Math.round((a * b) * 1000) / 1000;
    } else if (stringArray[operatorIndex] === '÷') {
        b === 0 ? output = 'Can\'t divide by 0' : output = Math.round((a / b) * 1000) / 1000;
    }

    calcHistory.style.visibility = "visible";
    resetStoredValues();
    return output
}

const setNum1 = () => {
    let stringArray = [...calcOutput.textContent];
    num1 = Number((stringArray.slice(0, operatorIndex)).join(''));
}

const setNum2 = () => {
    let stringArray = [...calcOutput.textContent];
    num2 = Number((stringArray.slice(operatorIndex + 1)).join(''));
}

const resetStoredValues = () => {
    operatorIndex = undefined;
    num1 = undefined;
    num2 = undefined;
}

const checkDecimals = (e) => e == '.';

// Button Call Functions
createClearButtons();
createDigitButtons();
createOperatorButtons();