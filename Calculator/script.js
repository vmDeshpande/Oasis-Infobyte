const display = document.getElementById('display');
let lastFunction = false; // To track if the last input was a function requiring parentheses

function appendValue(value) {
    if (lastFunction && !isNaN(value)) {
        // If the last input was a function and now a number is pressed, insert inside parentheses
        display.value += value + ')';
        lastFunction = false;
    } else {
        display.value += value;
        if (value.includes('(')) {
            lastFunction = true; // Mark that a function requiring parentheses was added
        } else {
            lastFunction = false; // Reset if no function is active
        }
    }
}

function clearDisplay() {
    display.value = '';
    lastFunction = false;
}

function deleteValue() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        display.value = eval(display.value); // Evaluate the expression
    } catch (error) {
        display.value = 'Error'; // Display error for invalid inputs
    }
}
