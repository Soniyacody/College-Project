const counters = {};
function startCounter(count, elementId, target, interval) {
  const counter = setInterval(() => {
    count++;
    document.querySelector(`#${elementId}`).innerHTML = count + "+";
    if (count === target) {
      clearInterval(counter);
      counters[elementId] = count;
      updateProjectCounter(); // Call the function to update the project counter
    }
  }, interval);
}

function updateProjectCounter() {
  // Check if all counters have completed
  if (
    "number1" in counters &&
    "number2" in counters &&
    "number3" in counters &&
    "number4" in counters
  ) {
    // Calculate the total and update the project counter
    const total = counters["number1"] + counters["number2"] + counters["number3"] + counters["number4"];
    document.getElementById("project-counter-wrp").innerHTML = total;
  }
}

startCounter(1, "number1", 25, 100);
startCounter(1, "number2", 100, 100);
startCounter(1, "number3", 50, 100);
startCounter(1, "number4", 120, 100);
