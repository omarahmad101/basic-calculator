document.addEventListener('DOMContentLoaded', () => {
    const resultDisplay = document.getElementById('result');
    const buttons = document.querySelectorAll('.buttons button');
    let currentInput = '';
    let operator = '';
    let previousInput = '';
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const buttonText = button.textContent;
  
        if (button.classList.contains('number') || button.classList.contains('decimal')) {
          if (buttonText === '.' && currentInput.includes('.')) {
            return; // Prevent multiple decimals
          }
          currentInput += buttonText;
          resultDisplay.value = currentInput;
        }
  
        if (button.classList.contains('operator')) {
          if (currentInput === '' && buttonText === '-') {
            // Allow negative numbers
            currentInput = '-';
            resultDisplay.value = currentInput;
          } else if (currentInput !== '') {
            if (previousInput !== '') {
              currentInput = calculate(previousInput, currentInput, operator);
            }
            operator = buttonText;
            previousInput = currentInput;
            currentInput = '';
            resultDisplay.value = previousInput;
          }
        }
  
        if (button.classList.contains('equal')) {
          if (currentInput !== '' && previousInput !== '') {
            resultDisplay.value = calculate(previousInput, currentInput, operator);
            previousInput = '';
            currentInput = resultDisplay.value;
          }
        }
  
        if (button.classList.contains('clear')) {
          currentInput = '';
          operator = '';
          previousInput = '';
          resultDisplay.value = '';
        }
      });
    });
  
    function calculate(firstInput, secondInput, operator) {
      const firstNumber = parseFloat(firstInput);
      const secondNumber = parseFloat(secondInput);
      let result = 0;
  
      switch (operator) {
        case '+':
          result = firstNumber + secondNumber;
          break;
        case '-':
          result = firstNumber - secondNumber;
          break;
        case '*':
          result = firstNumber * secondNumber;
          break;
        case '/':
          result = firstNumber / secondNumber;
          break;
        default:
          break;
      }
  
      return result.toString();
    }
  });
  