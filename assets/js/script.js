// Set calculator class to store element references for updating the display 
class Calculator {
    constructor(previousOperandandTextElement, currentOperandandTextElement) {
        this.previousOperandandTextElement = previousOperandandTextElement;
        this.currentOperandandTextElement = currentOperandandTextElement;
    }
}



// Select all buttons and elements with data attributes
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandandTextElement = document.querySelector('[data-current-operand]');