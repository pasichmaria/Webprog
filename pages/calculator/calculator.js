const calculator = {
    vievValue: '0',
    operator: null,
    waitOperand: false,
    firstOperand: null,
  };
function inputNumber(number) {
const { vievValue, waitOperand } = calculator;
    if (waitOperand === true) {
      calculator.vievValue = number;
      calculator.waitOperand = false;
    } else {
      calculator.vievValue = vievValue === '0' ? number : vievValue + number;
    }
  }
function handleOperator(nextOperator) {
    const { firstOperand, vievValue, operator } = calculator
    const inputValue = parseFloat(vievValue);
    if (operator && calculator.waitOperand)  {
      calculator.operator = nextOperator;
      return;
    }
    if (firstOperand == null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = operations(firstOperand, inputValue, operator);
      calculator.vievValue = String(result);
      calculator.firstOperand = result;
    }
    calculator.waitOperand = true;
    calculator.operator = nextOperator;
  }
  function updateDisplay() {
    const display = document.querySelector('.screen');
    display.value = calculator.vievValue;
  }
  
  updateDisplay();
 function operations(firstOperand, secondOperand, operator) {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '*') {
      return firstOperand * secondOperand;
    } else if (operator === '/') {
      return firstOperand / secondOperand;
    }
    return secondOperand;
  }
  function reset() {
    calculator.vievValue = '0';
    calculator.firstOperand = null;
    calculator.waitOperand = false;
    calculator.operator = null;
  }
  const key = document.querySelector('.key');
  key.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
      return;
    }
    switch (value) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '=':
        handleOperator(value);
        break;
      case 'all-clear':
        reset();
        break;
      default:
        if (Number.isInteger(parseFloat(value))) {
          inputNumber(value);
        }
    }
    updateDisplay();
  });