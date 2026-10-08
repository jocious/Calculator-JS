// The number currently shown on the calculator
let currentNumber = "0";

// Stores the first number
let firstNumber = null;

// Stores the selected operator
let operator = null;

// Stores calculator memory
let memory = 0;

// Tells the calculator when to start a new number
let shouldReset = false;


// Get the display element from HTML
const display = document.getElementById("display");

// Get the history element from HTML
const history = document.getElementById("history");


// ================================
// Update Display
// ================================

function updateDisplay() {

    // Show currentNumber on the screen
    display.textContent = currentNumber;

}


// ================================
// Add Number
// ================================

function addNumber(number) {

    // If we just finished a calculation,
    // start a new number
    if (shouldReset) {

        currentNumber = "0";

        shouldReset = false;

    }


    // Prevent more than one decimal point
    if (number === "." && currentNumber.includes(".")) {

        return;

    }


    // Replace the first 0
    // when entering another number
    if (currentNumber === "0" && number !== ".") {

        currentNumber = number;

    } else {

        // Add the number to the current number
        currentNumber += number;

    }


    // Update the display
    updateDisplay();

}


// ================================
// Choose Operator
// ================================

function chooseOperator(selectedOperator) {

    // Save the first number
    firstNumber = Number(currentNumber);

    // Save the operator
    operator = selectedOperator;


    // Show the calculation in history
    history.textContent =
        currentNumber + " " + selectedOperator;


    // The next number should start from 0
    shouldReset = true;

}


// ================================
// Calculate
// ================================

function calculate() {

    // Make sure we have a number and operator
    if (firstNumber === null || operator === null) {

        return;

    }


    // Get the second number
    let secondNumber = Number(currentNumber);


    // Variable to store answer
    let result = 0;


    // Addition
    if (operator === "+") {

        result = firstNumber + secondNumber;

    }


    // Subtraction
    if (operator === "-") {

        result = firstNumber - secondNumber;

    }


    // Multiplication
    if (operator === "*") {

        result = firstNumber * secondNumber;

    }


    // Division
    if (operator === "/") {


        // Prevent division by zero
        if (secondNumber === 0) {

            currentNumber = "Cannot divide by zero";

            updateDisplay();

            return;

        }


        // Perform division
        result = firstNumber / secondNumber;

    }


    // Show the complete calculation
    history.textContent =
        firstNumber + " " +
        operator + " " +
        secondNumber + " =";


    // Convert result to text
    currentNumber = String(result);


    // Clear the first number
    firstNumber = null;

    // Clear the operator
    operator = null;


    // Tell calculator that the next number is new
    shouldReset = true;


    // Show answer
    updateDisplay();

}


// ================================
// Clear All
// ================================

function clearAll() {

    // Reset current number
    currentNumber = "0";

    // Remove first number
    firstNumber = null;

    // Remove operator
    operator = null;

    // Clear history
    history.textContent = "";

    // Reset calculator state
    shouldReset = false;

    // Update display
    updateDisplay();

}


// ================================
// Clear Entry
// ================================

function clearEntry() {

    // Reset only the current number
    currentNumber = "0";

    // Update display
    updateDisplay();

}


// ================================
// Backspace
// ================================

function backspace() {

    // If there is only one character
    if (currentNumber.length === 1) {

        // Return to zero
        currentNumber = "0";

    } else {

        // Remove the last character
        currentNumber =
            currentNumber.slice(0, -1);

    }


    // Update display
    updateDisplay();

}


// ================================
// Change Sign
// ================================

function changeSign() {

    // Do not change zero
    if (currentNumber !== "0") {

        // Change positive to negative
        // or negative to positive
        currentNumber =
            String(Number(currentNumber) * -1);

    }


    // Update display
    updateDisplay();

}


// ================================
// Percentage
// ================================

function percent() {

    // Divide the number by 100
    currentNumber =
        String(Number(currentNumber) / 100);


    // Update display
    updateDisplay();

}


// ================================
// Disabled: 1/x
// ================================

// This function is kept for reference,
// but the HTML button is disabled.

function reciprocal() {

    // Check for division by zero
    if (Number(currentNumber) === 0) {

        currentNumber = "Cannot divide by zero";

    } else {

        // Calculate 1 divided by the number
        currentNumber =
            String(1 / Number(currentNumber));

    }


    // Update display
    updateDisplay();

}


// ================================
// Disabled: x²
// ================================

// This function is kept for reference,
// but the HTML button is disabled.

function square() {

    // Multiply number by itself
    currentNumber =
        String(Number(currentNumber) ** 2);


    // Update display
    updateDisplay();

}


// ================================
// Disabled: √x
// ================================

// This function is kept for reference,
// but the HTML button is disabled.

function squareRoot() {

    // Check if number is negative
    if (Number(currentNumber) < 0) {

        currentNumber = "Invalid input";

    } else {

        // Calculate square root
        currentNumber =
            String(Math.sqrt(Number(currentNumber)));

    }


    // Update display
    updateDisplay();

}


// ================================
// Memory Clear
// ================================

function memoryClear() {

    // Clear memory
    memory = 0;

}


// ================================
// Memory Recall
// ================================

function memoryRecall() {

    // Put memory value on display
    currentNumber = String(memory);

    // Update display
    updateDisplay();

}


// ================================
// Memory Add
// ================================

function memoryAdd() {

    // Add current number to memory
    memory += Number(currentNumber);

}


// ================================
// Memory Subtract
// ================================

function memorySubtract() {

    // Subtract current number from memory
    memory -= Number(currentNumber);

}


// ================================
// Memory Save
// ================================

function memorySave() {

    // Save current number to memory
    memory = Number(currentNumber);

}


// ================================
// Keyboard Support
// ================================

document.addEventListener("keydown", function(event) {


    // Number keys 0 to 9
    if (event.key >= "0" && event.key <= "9") {

        addNumber(event.key);

    }


    // Decimal point
    if (event.key === ".") {

        addNumber(".");

    }


    // Addition
    if (event.key === "+") {

        chooseOperator("+");

    }


    // Subtraction
    if (event.key === "-") {

        chooseOperator("-");

    }


    // Multiplication
    if (event.key === "*") {

        chooseOperator("*");

    }


    // Division
    if (event.key === "/") {

        chooseOperator("/");

    }


    // Enter key
    if (event.key === "Enter") {

        calculate();

    }


    // Escape key
    if (event.key === "Escape") {

        clearAll();

    }


    // Backspace key
    if (event.key === "Backspace") {

        backspace();

    }

});