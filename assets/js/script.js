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

    delete() {

    }

    // Function to append a number to the current operand
    appendNumber(number) {
        // Prevent adding more than one decimal point
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {

    }

    compute() {

    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
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

