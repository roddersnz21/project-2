// Calculator class will store element references for updating the display and constructor will take inputs and functions
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        // Call clear function to set default values
        this.clear();
    }

    // Function to clear all values
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // Function to delete last character from current operand
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // Function to append a number to the current operand
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
        this.currentOperand = ''
    }

    // function to perform the computation
    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        // return if either prev or current is not a number
        if (isNaN(previous) || isNaN(current)) return;
        // perform the computation based on the chosen operation
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
            case '÷':
                computation = previous / current;
                break;
            default:
                return;
        }
        // update the current operand with the result of the computation
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    // Update display method
    updateDisplay() {
        // Set text content of current and previous operand elements
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
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

// Set calculator class to make variable operate in calculator object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Add click event listener to each number button
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Append number to calculator and update display
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

// Add click event listener to each operation button
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Choose operation and update display
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

// Add click event listener to equals button
equalsButton.addEventListener('click', button => {
    // Compute calculation and update display
    calculator.compute();
    calculator.updateDisplay();
})

// Add click event listener to all clear button
allClearButton.addEventListener('click', button => {
    // Clear calculator and update display
    calculator.clear();
    calculator.updateDisplay();
})

// Add click event listener to delete button
deleteButton.addEventListener('click', button => {
    // Delete last digit and update display
    calculator.delete();
    calculator.updateDisplay();
})