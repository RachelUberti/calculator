// Set variables for the pressable keys
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys"); // This includes all children of the calculator div itself which are all the keys of the calculator
const display = document.querySelector(".calculator__display");

// Listen for all keypresses
keys.addEventListener("click", (e) => {
  // The e is targeting the "event" of a button being pressed
  if (e.target.matches("button")) {
    // Distinguish keys that are numbers, and keys that have a data-action (Eg. plus or clear)
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    // Setting the textContent property, any child nodes are removed and replaced by a single Text node containing the specified string. Ie. If the calculator shows 0, we want to replace the calculator’s display with the clicked key
    const previousKeyType = calculator.dataset.previousKeyType;
    // To replace the displayed number with clicked number

    if (!action) {
      // The exclamation mark (“!”) symbol, called a “bang,” is the logical “not” operator. Placed in front of a boolean value it will reverse the value, returning the opposite. ie. Not an action in this case and is a number

      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
        // If the calculator shows a non-zero number, we want to append the clicked key to the displayed number. To append a number, we concatenate a string
      }
      calculator.dataset.previousKeyType = "number";
    }
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      // Note: It's sufficient to check for firstValue and operator because secondValue always exists
      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        // Update calculated value as firstValue
        calculator.dataset.firstValue = calcValue;
      } else {
        // If there are no calculations, set displayedNum as the firstValue
        calculator.dataset.firstValue = displayedNum;
      }
      key.classList.add("is-depressed");
      // When clicked, the button will be highlighted so the user knows the operator is active
      calculator.dataset.previousKeyType = "operator";
      // Added a custom attribute to tell if the previous key was an operator key, so that it can update the display to the clicked key.
      calculator.dataset.operator = action;
    }
    if (action === "decimal") {
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
        // Concatenate . to the displayed number and check if the string already has dot
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = "0.";
      }
      calculator.dataset.previousKey = "decimal";
    }

    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }

      display.textContent = 0;
      calculator.dataset.previousKeyType = "clear";
    }
    if (action !== "clear") {
      const clearButton = calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }
    if (action === "calculate") {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      // To get the first number & the operator, we need to store the calculator’s displayed value before we wipe it clean. Need to add it to a custom attribute when the operator button gets clicked
      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }
        // We know that operator keys have not been clicked yet if firstValue is not set to a number. We can use this knowledge to prevent the equals from calculating.
        display.textContent = calculate(firstValue, operator, secondValue);
      }
      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
      // Carry forward the previous secondValue into the new calculation. Store it in a custom attribute: modValue
    }
    Array.from(key.parentNode.children).forEach(
      (k) => k.classList.remove("is-depressed")
      // To release the pressed state, this removes the is-depressed class from all keys through a forEach loop
    );
  }
});

// Create a calculate function. It should take in three parameters: the first number, the operator, and the second number.
const calculate = (n1, operator, n2) => {
  let result = "";
  //  Need to convert strings to numbers so that it doesn't concatenate numbers (1 + 1 = 11) instead of calculating. parseFloat converts a string into a float (a number with decimal places)
  if (operator === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === "subtract") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === "multiply") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === "divide") {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
};
