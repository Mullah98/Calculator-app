class Calculator {
    constructor(previousOperandText, currentOperandText) { //creating a class with a constructor which will take all inputs and store them 
      this.previousOperandText = previousOperandText
      this.currentOperandText = currentOperandText
      this.clear()
    }

  //Creating the rest of the calculator functions

    clear() { //Will delete any displayed values. Once button is clicked, the values will be empty strings.
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    delete() { //Convert value to string, get the last value of string and delete using slice method
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return //If the number has 1 decimal point then it will return the decimal and wont add anymore.
      this.currentOperand = this.currentOperand.toString() + number.toString() //We want the numbers to change to string so JS doesnt add the numbers together. We want it to display to the output as numbers with each button click
    }
  
    chooseOperation(operation) {  //In this section, if there is nothing in the current-operand, nothing will happen. But if there is an output in the previous operand
      if (this.currentOperand === '') return  //the calculator can perform an operation automatically whilst completing another one. eg: 2 + 2, and then you click x, then it will first complete 2 + 2 and show the result in the prev operand. 
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand  //Once we have finished typing the current number, we want it to move to previous operand and type in new value
      this.currentOperand = ''
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand) //Converting the string to numbers
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return //If there are no numbers in the previous and current operand, return and do nothing
      switch (this.operation) { //Switch statement for each operation
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case 'X':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation //Will show the result of the calculation
      this.operation = undefined
      this.previousOperand = ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString() //converts number to string  
      const integerDigits = parseFloat(stringNumber.split('.')[0]) //Splits the number using the dot and changes the first part (before the decimal) back to normal. So it would remove any zeros before the number so instead of 0023 it will just be 23.  
      const decimalDigits = stringNumber.split('.')[1] //Using the second part after the decimal as a string. If there is no decimal or no part after it, it will be null.
      let integerDisplay
      if (isNaN(integerDigits)) { //If no numbers, do nothing
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 }) //Will only allow 1 decimal point
      }
      if (decimalDigits != null) { //Clearing the prev operand value and checking if it is an empty string
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
  
    updateDisplay() {
      this.currentOperandText.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) { //If the operation is not null, then display this
        this.previousOperandText.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` //This will show the number in the prev operand with the symbol of the operation
      } else {
        this.previousOperandText.innerText = ''
      }
    }
  }
  
  /* Create the seperate button variables for the elements 
  using querySelector and querySelector all */

  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-clear]')
  const previousOperandText = document.querySelector('[data-previous-operand]')
  const currentOperandText = document.querySelector('[data-current-operand]')
  
  //Creating another calculator const and pass everything from the constructor into it & pass in prev and curr operand text.
  
  const calculator = new Calculator(previousOperandText, currentOperandText)
  
  /*Go over each button element using for.Each and add event listener to any clicked button.
  Once clicked, number will be added by calling appendNumber() function and also call
  updateDisplay() function so the number wil be displayed*/
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  

  //When you choose an operation, the button will show in the display and perform the chooseOperation() function + the updateDisplay() function
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })