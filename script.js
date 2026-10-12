
/*
    document.getElementById() searches the HTML document for an element
    with the specified id.

    The display variable refers to the large number area.
    The history variable refers to the smaller area above it.

    We save these elements in variables so we can update their text
    whenever the user presses a calculator button.
*/
const display = document.getElementById("display");
const history = document.getElementById("history");

/*
    currentNumber stores the number currently shown on the screen.
    It is a string because the user may still be typing digits or a decimal point.

    firstNumber stores the first number used in an arithmetic operation.
    operator stores the selected operation, such as add or multiply.

    newEntry tells the calculator whether the next digit should start
    a new number instead of being added to the existing number.
*/
let currentNumber = "0";
let firstNumber = null;
let operator = null;
let newEntry = false;


/*
    This function updates the number shown on the screen.

    textContent changes the text inside the HTML display element.
    Whenever currentNumber changes, we call this function to show the update.
*/
function updateDisplay() {
    display.textContent = currentNumber;
}


/*
    This function prepares a calculated result for display.

    Number.isFinite() checks whether the result is a valid finite number.
    If the calculation produces Infinity or NaN, we display "Error".

    toPrecision(12) limits the result to 12 significant digits.
    Number() removes unnecessary trailing decimal zeros.
    String() converts the final result back into text for the display.
*/
function formatNumber(number) {
    if (!Number.isFinite(number)) {
        return "Error";
    }

    return String(Number(number.toPrecision(12)));
}


/*
    This function runs when a number button is clicked.

    The number parameter contains the digit from the clicked button.
    For example, pressing the 7 button passes "7" into this function.

    If the display contains an error or a new entry should begin,
    we replace the current number with the new digit.

    If the display is still "0", we replace it instead of displaying
    something like "07".

    Otherwise, we add the new digit to the end of the existing number.
    For example, entering 1, then 2, then 3 produces "123".
*/
function enterNumber(number) {
    if (currentNumber === "Error" || newEntry) {
        currentNumber = number;
        newEntry = false;
    } else if (currentNumber === "0") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }

    // Refresh the display so the user can see the newly entered digit.
    updateDisplay();
}


/*
    This function handles the decimal-point button.

    If a new number is starting, we begin with "0.".
    This allows the user to enter a decimal such as 0.5.

    includes(".") checks whether the current number already has a decimal.
    The condition prevents the user from entering invalid values such as 1.2.3.

    Finally, updateDisplay() shows the updated number.
*/
function enterDecimal() {
    if (currentNumber === "Error" || newEntry) {
        currentNumber = "0.";
        newEntry = false;
    } else if (!currentNumber.includes(".")) {
        currentNumber += ".";
    }

    updateDisplay();
}


/*
    This function converts an operator's internal name into its symbol.

    The HTML uses names such as "add" and "multiply" because they are
    convenient identifiers for JavaScript.

    The calculator display should show mathematical symbols instead:
    add becomes +, subtract becomes −, multiply becomes ×, and divide becomes ÷.
*/
function operatorSymbol(op) {
    const symbols = {
        add: "+",
        subtract: "−",
        multiply: "×",
        divide: "÷"
    };

    // Return the matching symbol, or an empty string if none matches.
    return symbols[op] || "";
}


/*
    This function performs the four basic arithmetic operations.

    Parameters:
    a = the first number
    b = the second number
    op = the selected operator

    The switch statement checks which operation was selected.
    Each case performs the correct mathematical calculation.

    Division checks whether b is zero because dividing by zero is invalid.
    If the divisor is zero, NaN is returned and formatNumber() displays "Error".
*/
function calculate(a, b, op) {
    switch (op) {
        case "add":
            return a + b;

        case "subtract":
            return a - b;

        case "multiply":
            return a * b;

        case "divide":
            return b === 0 ? NaN : a / b;

        default:
            return b;
    }
}


/*
    This function runs when the user presses +, −, ×, or ÷.

    First, we stop if the display contains an error.
    Number() converts the displayed text into a numeric value for calculations.

    If an operation is already waiting and the user has entered the second
    number, we calculate that operation before storing the next operator.
    This allows chained calculations such as 2 + 3 + 4.

    Otherwise, the current number becomes the first number.

    We then save the newly selected operator and show it in the history area.
    Setting newEntry to true tells enterNumber() that the next digit
    must begin a new number.
*/
function chooseOperator(selectedOperator) {
    if (currentNumber === "Error") return;

    const value = Number(currentNumber);

    if (operator !== null && !newEntry) {
        const result = calculate(
            firstNumber,
            value,
            operator
        );

        currentNumber = formatNumber(result);
        updateDisplay();

        firstNumber = result;
    } else {
        firstNumber = value;
    }

    // Remember which operation the user selected.
    operator = selectedOperator;

    // Display the current number and operator above the main display.
    history.textContent =
        currentNumber + " " + operatorSymbol(operator);

    // The next number entered should replace the current display.
    newEntry = true;
}


/*
    This function runs when the user presses the equals button.

    If there is no stored first number or operator, there is no pending
    arithmetic operation to calculate, so the function stops.

    Otherwise, the current display becomes the second number.
    calculate() performs the operation using both numbers and the operator.

    We save the expression in the history area so the user can see
    what was calculated, then display the formatted answer.

    Finally, we clear firstNumber and operator so the previous calculation
    is no longer waiting for another operand.
*/
function showResult() {
    if (operator === null || firstNumber === null) return;
    if (currentNumber === "Error") return;

    const secondNumber = Number(currentNumber);

    // Save the complete calculation before changing the display.
    const expression =
        firstNumber + " " +
        operatorSymbol(operator) + " " +
        secondNumber + " =";

    // Perform the calculation using the stored values.
    const result = calculate(
        firstNumber,
        secondNumber,
        operator
    );

    // Show the answer and keep the expression in the history area.
    currentNumber = formatNumber(result);
    history.textContent = expression;

    // Clear the stored operation after calculating the answer.
    firstNumber = null;
    operator = null;

    // The next digit entered should start a new number.
    newEntry = true;

    // Update the visible number to show the answer.
    updateDisplay();
}


/*
    CE means Clear Entry.

    This function resets only the currently displayed number to zero.
    It does not clear the stored first number or operator.

    For example, if the user has entered 5 + 8 and wants to clear
    the current entry, this function changes the display to zero.
*/
function clearEntry() {
    currentNumber = "0";
    newEntry = false;

    // Show the cleared entry on the calculator.
    updateDisplay();
}


/*
    C means Clear.

    This function resets the entire calculation.
    It clears the displayed number, first number, selected operator,
    new-entry state, and previous calculation history.

    After pressing C, the calculator is ready for a completely new calculation.
*/
function clearAll() {
    currentNumber = "0";
    firstNumber = null;
    operator = null;
    newEntry = false;

    // Remove the previous expression from the history area.
    history.textContent = "";

    // Show zero on the main display.
    updateDisplay();
}


/*
    This function handles the backspace button (⌫).

    When a user types 1234 and presses backspace, the result should be 123.
    slice(0, -1) creates a new string without the final character.

    If the display contains an error, we reset it to zero.
    If newEntry is true, we start a fresh entry at zero because the
    current display is a completed result or an operation is waiting.

    If the number contains more than one character, we remove the last one.
    If removing the last character leaves only a minus sign, we reset to zero.
    If only one character remains, pressing backspace resets it to zero.

    updateDisplay() then shows the changed number.
*/
function backspace() {
    if (currentNumber === "Error") {
        currentNumber = "0";
        newEntry = false;
    } else if (newEntry) {
        currentNumber = "0";
        newEntry = false;
    } else if (currentNumber.length > 1) {
        currentNumber = currentNumber.slice(0, -1);

        // A minus sign alone is not a complete number.
        if (currentNumber === "-") {
            currentNumber = "0";
        }
    } else {
        currentNumber = "0";
    }

    // Refresh the screen after deleting the character.
    updateDisplay();
}


/*
    This function handles the +/− button.

    Number() converts the displayed text into a number.
    Multiplying that number by -1 reverses its sign.

    For example, 5 becomes -5, and -5 becomes 5.
    Zero stays zero because positive zero and negative zero are equivalent
    for the purposes of this calculator display.

    We then update the display to show the changed sign.
*/
function changeSign() {
    if (currentNumber === "Error") return;

    if (Number(currentNumber) !== 0) {
        currentNumber = String(-Number(currentNumber));
    }

    newEntry = false;
    updateDisplay();
}


/*
    This function handles the percentage button.

    In this simplified version, percentage means dividing the displayed
    number by 100. For example, 50 becomes 0.5.

    formatNumber() prepares the result for display.
    newEntry is set to true so the next digit begins a new entry.
*/
function percentage() {
    if (currentNumber === "Error") return;

    currentNumber = formatNumber(Number(currentNumber) / 100);

    newEntry = true;
    updateDisplay();
}


/*
    This function calculates the reciprocal of the displayed number.

    A reciprocal is calculated using 1 divided by the number.
    For example, the reciprocal of 4 is 1 / 4 = 0.25.

    A reciprocal cannot be calculated when the number is zero,
    so the calculator displays "Error" in that case.
*/
function reciprocal() {
    if (currentNumber === "Error") return;

    const number = Number(currentNumber);

    currentNumber = number === 0
        ? "Error"
        : formatNumber(1 / number);

    newEntry = true;
    updateDisplay();
}


/*
    This function calculates the square of the displayed number.

    Squaring a number means multiplying it by itself.
    For example, 5 squared is 5 * 5 = 25.

    The answer is formatted and displayed immediately.
*/
function square() {
    if (currentNumber === "Error") return;

    const number = Number(currentNumber);

    currentNumber = formatNumber(number * number);

    newEntry = true;
    updateDisplay();
}


/*
    This function calculates the square root of the displayed number.

    Math.sqrt() is a built-in JavaScript method that calculates square roots.
    For example, Math.sqrt(9) returns 3.

    Negative numbers do not have real-number square roots, so this
    calculator displays "Error" when the input is negative.
*/
function squareRoot() {
    if (currentNumber === "Error") return;

    const number = Number(currentNumber);

    currentNumber = number < 0
        ? "Error"
        : formatNumber(Math.sqrt(number));

    newEntry = true;
    updateDisplay();
}


/*
    This event listener waits for clicks anywhere inside the buttons container.

    addEventListener() allows JavaScript to respond when an event occurs.
    The "click" event happens when the user clicks a button.

    event.target identifies the exact element that was clicked.
    If the clicked element is not a button, the function stops.

    We use data-number, data-operator, and data-action attributes from HTML
    to decide which calculator function should run.
*/
document.querySelector(".buttons").addEventListener("click", function(event) {
    const button = event.target;

    // Ignore clicks that did not target an HTML button.
    if (button.tagName !== "BUTTON") return;

    /*
        dataset.number reads the data-number attribute from HTML.
        If it exists, the clicked button is a digit button.
        We pass that digit to enterNumber() and then stop processing this click.
    */
    if (button.dataset.number !== undefined) {
        enterNumber(button.dataset.number);
        return;
    }

    /*
        dataset.operator reads the data-operator attribute.
        If it exists, the user clicked an arithmetic operator.
        chooseOperator() stores the selected operation.
    */
    if (button.dataset.operator) {
        chooseOperator(button.dataset.operator);
        return;
    }

    /*
        The switch statement handles the remaining buttons.
        button.dataset.action identifies the action specified in HTML.
        Each case calls the function that matches that action.
    */
    switch (button.dataset.action) {
        case "decimal":
            enterDecimal();
            break;

        case "equals":
            showResult();
            break;

        case "clear-entry":
            clearEntry();
            break;

        case "clear":
            clearAll();
            break;

        case "backspace":
            backspace();
            break;

        case "sign":
            changeSign();
            break;

        case "percent":
            percentage();
            break;

        case "reciprocal":
            reciprocal();
            break;

        case "square":
            square();
            break;

        case "sqrt":
            squareRoot();
            break;
    }
});


/*
    This event listener allows the user to operate the calculator
    using the computer keyboard instead of clicking every button.

    event.key tells us which key was pressed.
    The conditions check the pressed key and call the matching function.

    Backspace deletes a character.
    Escape clears the calculator.
    Enter or = calculates the answer.
    The arithmetic keys select their corresponding operators.

    preventDefault() stops the browser from performing its normal
    action for the division key, allowing the calculator to handle it.
*/
document.addEventListener("keydown", function(event) {
    // Check whether the pressed key is a digit from 0 through 9.
    if (/^[0-9]$/.test(event.key)) {
        enterNumber(event.key);
    } else if (event.key === ".") {
        // Allow decimal-point entry from the keyboard.
        enterDecimal();
    } else if (event.key === "Backspace") {
        // Delete the last character just like the ⌫ button.
        backspace();
    } else if (event.key === "Escape") {
        // Clear the calculator when Escape is pressed.
        clearAll();
    } else if (event.key === "Enter" || event.key === "=") {
        // Calculate the answer when Enter or = is pressed.
        showResult();
    } else if (event.key === "+") {
        chooseOperator("add");
    } else if (event.key === "-") {
        chooseOperator("subtract");
    } else if (event.key === "*") {
        chooseOperator("multiply");
    } else if (event.key === "/") {
        // Stop the browser's default action for the slash key.
        event.preventDefault();
        chooseOperator("divide");
    }
});
