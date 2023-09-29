const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');


let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
  // Substituir o valor de exibição atual se o primeiro valor for inserido
  if(awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // se o valor de exibição atual for 0, substitua-o, se não, adicione o número
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
  }
  
}

function addDecimal() {
  // se operador pressionado, não adicione decimal
  if (awaitingNextValue) return;
  // se não houver decimal, adicione um
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// Calcule o primeiro e o segundo valor dependendo do operador
const calculate = {
  '/': (firstNumber, secondNumber) => (firstNumber / secondNumber),
  '*': (firstNumber, secondNumber) => (firstNumber * secondNumber),
  '+': (firstNumber, secondNumber) => (firstNumber + secondNumber),
  '-': (firstNumber, secondNumber) => (firstNumber - secondNumber),
  '=': (firstNumber, secondNumber) => secondNumber,
}


function useOperador(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // impedir operador múltiplo
  if (operator && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  //Atribuir o primeiro valor se nenhum valor
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue] (firstValue, currentValue);
    calculatorDisplay.textContent = calculation ;
    firstValue = calculation;
  }
  // Pronto para o próximo valor, operador da loja
  awaitingNextValue = true;
  operatorValue = operator;
}
// Adicionar Event Listeners(ouvintes) paraos botões de números, operadores e decimais
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
      } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperador(inputBtn.value));
      } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
      }
});

// redefinir todos os valores exibição
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';

}
// Event Listener
clearBtn.addEventListener('click', resetAll);
