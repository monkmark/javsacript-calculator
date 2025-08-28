let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equals-btn')
const clearButton = document.getElementById('clear-btn')
const deleteButton = document.getElementById('delete-btn')
const pointButton = document.getElementById('point-btn')
const lastOperationScreen = document.getElementById('PrevOperandScreen')
const currentOperationScreen = document.getElementById('CurrentOperandScreen')

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPoint)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
    if (CurrentOperandScreen.textContent === '0' || shouldResetScreen)
      resetScreen()
    currentOperationScreen.textContent += number
}

function resetScreen() {
    CurrentOperandScreen.textContent = ''
    shouldResetScreen = false
}
  
function clear() {
    CurrentOperandScreen.textContent = '0'
    PrevOperandScreen.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}

function appendPoint() {
    if (shouldResetScreen) resetScreen()
    if (CurrentOperandScreen.textContent === '')
      CurrentOperandScreen.textContent = '0'
    if (CurrentOperandScreen.textContent.includes('.')) return
    CurrentOperandScreen.textContent += '.'
}

function deleteNumber() {
    CurrentOperandScreen.textContent = CurrentOperandScreen.textContent
      .toString()
      .slice(0, -1)
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    firstOperand = CurrentOperandScreen.textContent
    currentOperation = operator
    PrevOperandScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return
    if (currentOperation === '÷' && CurrentOperandScreen.textContent === '0') {
      alert("You can't divide by 0!")
      return
    }
    secondOperand = CurrentOperandScreen.textContent
  CurrentOperandScreen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  )
  PrevOperandScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
  currentOperation = null
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === 'x') return '*'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
}

function add(a, b) {
    return a + b;
}
  
function substract(a, b) {
    return a - b;
}
  
function multiply(a, b) {
    return a * b;
}
  
function divide(a, b) {
    return a / b;
}
  

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
      case '+':
        return add(a, b)
      case '−':
        return substract(a, b)
      case 'x':
        return multiply(a, b)
      case '÷':
        if (b === 0) return null
        else return divide(a, b)
      default:
        return null
    }
}