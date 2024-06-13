// script.js
document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    const equals = document.getElementById('equals');
    const clear = document.getElementById('clear');
    
    let currentInput = '';
    let operator = null;
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (button.classList.contains('operator')) {
                if (currentInput !== '') {
                    previousInput = currentInput;
                    currentInput = '';
                }
                operator = value;
            } else {
                if (value === '.' && currentInput.includes('.')) return;
                currentInput += value;
            }
            updateDisplay();
        });
    });

    equals.addEventListener('click', () => {
        if (currentInput !== '' && previousInput !== '' && operator !== null) {
            currentInput = calculate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
            operator = null;
            previousInput = '';
            updateDisplay();
        }
    });

    clear.addEventListener('click', () => {
        currentInput = '';
        operator = null;
        previousInput = '';
        updateDisplay();
    });

    function updateDisplay() {
        display.textContent = currentInput || previousInput || '0';
    }

    function calculate(a, b, operator) {
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: return 0;
        }
    }
});
