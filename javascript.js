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

    if (!action) {
      console.log("number key!");
      // The exclamation mark (“!”) symbol, called a “bang,” is the logical “not” operator. Placed in front of a boolean value it will reverse the value, returning the opposite. ie. Not an action in this case and is a number
      if (displayedNum === "0") {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
        // If the calculator shows a non-zero number, we want to append the clicked key to the displayed number. To append a number, we concatenate a string
      }
    }
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      key.classList.add("is-depressed");
      // When clicked, the button will be highlighted so the user knows the operator is active
    }
    if (action === "decimal") {
      display.textContent = displayedNum + ".";
      // Concatenate . to the displayed number
    }

    if (action === "clear") {
      console.log("clear key!");
    }

    if (action === "calculate") {
      console.log("equal key!");
    }
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );
  }
});
