// Get the main calculator display
let display = document.getElementById("display");

// Get the small history display
let history = document.getElementById("history");

// Store the first number
let firstNumber = "";

// Store the selected operation
let selectedOperator = "";


// ==============================
// ADD A NUMBER
// ==============================

function number(num) {

    // If display is 0, replace it
    if (display.textContent === "0") {

        display.textContent = num;

    }

    // Otherwise, add the number
    else {

        display.textContent += num;

    }
}


// ==============================
// ADD DECIMAL
// ==============================

function decimal() {

    // Check if decimal does not already exist
    if (!display.textContent.includes(".")) {

        // Add decimal point
        display.textContent += ".";

    }
}


// ==============================
// SELECT OPERATOR
// ==============================

function operator(op) {

    // Save the first number
    firstNumber = display.textContent;

    // Save the selected operator
    selectedOperator = op;

    // Show the first number and operator
    history.textContent =
        firstNumber + " " + op;

    // Clear the display for the second number
    display.textContent = "0";
}


// ==============================
// CALCULATE ANSWER
// ==============================

function calculate() {

    // Get the second number
    let secondNumber = display.textContent;

    // Convert first number from text to number
    let a = Number(firstNumber);

    // Convert second number from text to number
    let b = Number(secondNumber);

    // Create a variable for the answer
    let answer;


    // Addition
    if (selectedOperator === "+") {

        answer = a + b;

    }


    // Subtraction
    if (selectedOperator === "-") {

        answer = a - b;

    }


    // Multiplication
    if (selectedOperator === "*") {

        answer = a * b;

    }


    // Division
    if (selectedOperator === "/") {

        // Prevent division by zero
        if (b === 0) {

            display.textContent = "Error";

            return;
        }

        answer = a / b;

    }


    // Show the complete calculation
    history.textContent =
        firstNumber + " " +
        selectedOperator + " " +
        secondNumber + " =";


    // Show the answer
    display.textContent = answer;
}


// ==============================
// CLEAR CALCULATOR
// ==============================

function clearAll() {

    // Reset the main display
    display.textContent = "0";

    // Clear the history
    history.textContent = "";

    // Clear the first number
    firstNumber = "";

    // Clear the operator
    selectedOperator = "";
}


// ==============================
// DELETE LAST NUMBER
// ==============================

function backspace() {

    // Remove the last character
    display.textContent =
        display.textContent.slice(0, -1);


    // If there is nothing left
    if (display.textContent === "") {

        // Return to 0
        display.textContent = "0";

    }
}


// ==============================
// CHANGE POSITIVE / NEGATIVE
// ==============================

function changeSign() {

    // Change positive number to negative
    // or negative number to positive
    display.textContent =
        Number(display.textContent) * -1;
}