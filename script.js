const buttons = [
    ['%', 'CE', 'C', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['+/-', '0', '.', '=']
]
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const operations = ['+', '-', '/', '*']
const resets = ['CE', 'C']
const equals = ['=']
const displayEl = document.querySelector('.display')
let stage = 0
let num1 = ''
let op=''
let num2 = ''
const buttonsEl = document.querySelector('.buttons')
// Калькулятор

// команды для вывода текста
// скрипты для цифр
// скрипты для действий
// кнопка обнуления
const newButton = (btn) => {
    const el = document.createElement('div')
    el.classList.add('btn')
    el.textContent = btn
    buttonsEl.appendChild(el)
}
const showInfo = () => {
    displayEl.textContent = num1 + op + num2 || '0' 
    if(stage===4){
        displayEl.textContent += '='
        if(op==='+'){
            displayEl.textContent += (+num1+(+num2))
        }
        else if(op==="-"){
            displayEl.textContent += (num1-num2)
        }
        else if(op==="*"){
            displayEl.textContent += (num1*num2)
        }
        else if(op==="/"){
            displayEl.textContent += (num1/num2)
        }
    }
}
const handleClick = (text) => {
    console.log(text)
    const isDigit = digits.includes(text)
    const isReset = resets.includes(text)
    const isOperation = operations.includes(text)
    const isEqual = equals.includes(text)
    // if (isDigit){
    //     showInfo(text)
    // }
    if (stage === 0) { //Сброшено
        if (isDigit && text !== '0') {
            stage = 1
            // alert('stage=1')
            num1 = text
        }
    }
    else if (isReset) {
        stage = 0
        // alert('stage=0')
        num1 = ''
        op = ''
        num2 = ''
    }
    else if (stage === 1) {//Ввод первого числа
        if (isDigit) {
            num1 += text
        }
        else if (isOperation){
            stage = 2
            // alert('stage=2')
            op = text
        }
    }
    else if(stage===2){ //Ввод арифметических операций
        if (isOperation){
            op = text
        }
        else if (isDigit && text !=='0'){
            stage = 3
            num2 = text
        }
    }
    else if(stage===3){
        if(isDigit){
            num2 +=text
        }
        else if(isEqual){
            stage = 4
        }
    }   
    showInfo()
}
for (const row of buttons) {
    for (const btn of row) {
        newButton(btn)
    }
}
document.querySelectorAll('.btn')
    .forEach((buttonEl) => {
        buttonEl.onclick = () => {
            handleClick(buttonEl.textContent)
        }
    })