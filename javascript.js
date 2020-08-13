// Set variables for the pressable keys
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys"); // This includes all children of the calculator div itself which are all the keys of the calculator

// Listen for all keypresses
keys.addEventListener("click", (e) => {
  // The e is targeting the "event" of a button being pressed
  if (e.target.matches("button")) {
    // Do something
  }
});

// Distinguish keys that are numbers, and keys that have a data-action (Eg. plus or clear)
const key = e.target;
const action = key.dataset.action;

if (!action) {
  console.log("number key!");
}
if (
  action === "add" ||
  action === "subtract" ||
  action === "multiply" ||
  action === "divide"
) {
  console.log("operator key!");
}
if (action === "decimal") {
  console.log("decimal key!");
}

if (action === "clear") {
  console.log("clear key!");
}

if (action === "calculate") {
  console.log("equal key!");
}
