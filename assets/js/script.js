// Calculator class will store element references for updating the display and constructor will take inputs and functions
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        // Call clear function to set default values
        this.clear();
    }

    // Method to clear all values
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // Method to delete last character from current operand
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // Method to append a number to the current operand
    appendNumber(number) {
        // Prevent adding more than one decimal point
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    // Choose operation method
    chooseOperation(operation) {
        // Return if current operand is empty
        if (this.currentOperand === '') return;
        // Compute previous operation if previous operand is not empty
        if (this.previousOperand !== '') {
            this.compute();
        }
        // Set chosen operation, previous operand and reset current operand
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    // Method to perform the computation
    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        // Return if either previous or current is not a number
        if (isNaN(previous) || isNaN(current)) return;
        // Perform the computation based on the chosen operation
        switch (this.operation) {
            case '+':
                computation = previous + current;
                break;
            case '-':
                computation = previous - current;
                break;
            case '*':
                computation = previous * current;
                break;
            case '??':
                computation = previous / current;
                break;
            default:
                return;
        }
        // Set the result as the current operand and reset previous operand and operation
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    // Method to calculate the percentage of a number
    percentage() {
        // Return if current operand is empty
        if (this.currentOperand === '') return;
        // Calculate the percentage of the current operand and set it as the current operand
        this.currentOperand = parseFloat(this.currentOperand) / 100;
}

    // Method to format the display number
    getDisplayNumber(number) {
        // Convert the number to a string
        const stringNumber = number.toString();
        // Split the string into the integer and decimal parts
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        // Create a variable to store the integer part of the number in display format
        let integerDisplay;
        // If the integer part is not a number, set integerDisplay to an empty string
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            // Otherwise, format the integer part as a localised string with no fractional digits
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        // If there are decimal digits, return the number in the format 'integerDisplay.decimalDigits'
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            // Otherwise, return just the formatted integer part
            return integerDisplay;
        }
    }

    // Update display method
    updateDisplay() {
        // Set text content of current operand element to formatted current operand
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand);
        // If an operation is selected, set text content of previous operand element to formatted previous operand and operation symbol
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            // Otherwise, set text content of previous operand element to empty string
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// Select all buttons and elements with data attributes
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const percentageButton = document.querySelector('[data-percentage]');

// Set calculator class to make variable operate in calculator object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Add click event listener to each number button
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Append number to calculator and update display
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

// Add click event listener to each operation button
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Choose operation and update display
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

// Add click event listener to equals button
equalsButton.addEventListener('click', button => {
    // Compute calculation and update display
    calculator.compute();
    calculator.updateDisplay();
});

// Add click event listener to all clear button
allClearButton.addEventListener('click', button => {
    // Clear calculator and update display
    calculator.clear();
    calculator.updateDisplay();
});

// Add click event listener to delete button
deleteButton.addEventListener('click', button => {
    // Delete last digit and update display
    calculator.delete();
    calculator.updateDisplay();
});

// Add click event listener to percentage button
percentageButton.addEventListener('click', () => {
    // Call percentage function and update display
    calculator.percentage();
    calculator.updateDisplay();
});