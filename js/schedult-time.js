// Get all day buttons and day slots
const dayButtons = document.querySelectorAll(".schedule-day");
const daySlots = document.querySelectorAll(".day-schedule");

function hideAllSlots() {
  daySlots.forEach((slot) => {
    slot.style.display = "none";
  });
}
function showDaySlot(targetId) {
  const targetSlot = document.getElementById(targetId);
  if (targetSlot) {
    targetSlot.style.display = "block";
  }
}
dayButtons.forEach((button) => {
  button.addEventListener("click", () => {
    dayButtons.forEach((btns) => {
      btns.classList.remove("active-day");
    });
    hideAllSlots();
    const targetId = button.getAttribute("data-target");
    button.classList.add("active-day");
    showDaySlot(targetId);
  });
});
const activeDayButton = document.querySelector(".active-day");
if (activeDayButton) {
  const targetId = activeDayButton.getAttribute("data-target");
  showDaySlot(targetId);
}

// **************Pop wala code ***************
// Get modal elements
const modalOverlay = document.getElementById("modal-overlay");
const modal = document.getElementById("modal");
const closeButtons = document.querySelectorAll(".close-modal");
function openModal(container) {
  modalOverlay.style.display = "flex";
  document
    .querySelectorAll(".add-slot-container, .edit-slot-container")
    .forEach(function (element) {
      element.style.display = "none";
    });
  container.style.display = "block";
}
function closeModal() {
  modalOverlay.style.display = "none";
}
document.querySelector(".add-slot").addEventListener("click", function () {
  openModal(document.querySelector(".add-slot-container"));
});
document.querySelector(".edit-element").addEventListener("click", function () {
  openModal(document.querySelector(".edit-slot-container"));
});
closeButtons.forEach(function (button) {
  button.addEventListener("click", closeModal);
});
modalOverlay.addEventListener("click", function (event) {
  if (event.target === modalOverlay) {
    closeModal();
  }
});
modal.addEventListener("click", function (event) {
  event.stopPropagation();
});

// *****ADD ELEMENT AND DELETE ELEMENT CODE*****
// Function to delete a row when the trash icon is clicked
function deleteRow(row) {
  if (row) {
    row.remove();
  }
}

// Function to add a new row to a specified container
function addRow(container) {
  let slotRow;

  // Check if a ".slot-row" element is available within the specified container
  const existingSlotRow = container.querySelector(".slot-row");

  if (existingSlotRow) {
    // Clone the existing ".slot-row" if available
    slotRow = existingSlotRow.cloneNode(true);
  } else {
    // Clone the ".slot" element and add a row if no ".slot-row" is available
    const slot = container.querySelector(".slot").cloneNode(true);
    slotRow = slot.querySelector(".slot-row");

    // Remove any existing "slot-row" classes
    slotRow.classList.remove("slot-row");
  }

  // Add a click event listener to the trash icon in the newly added row
  const trashIcon = slotRow.querySelector(".trash");
  trashIcon.addEventListener("click", function (event) {
    deleteRow(slotRow);
  });

  // Append the cloned row to the specified container
  container.querySelector(".hours-info").appendChild(slotRow);
}

// Event listener to delete a row when the trash icon is clicked using event delegation
document.body.addEventListener("click", function (event) {
  if (event.target.classList.contains("trash")) {
    const row = event.target.closest(".slot-row");
    deleteRow(row);
  }
});

// Event listener to add a new row when "Add More" is clicked in the "add-slot-container"
document.querySelector(".add-slot-container .add-row").addEventListener("click", function () {
  const container = document.querySelector(".add-slot-container");
  addRow(container);
});

// Event listener to add a new row when "Add More" is clicked in the "edit-slot-container"
document.querySelector(".edit-slot-container .add-row").addEventListener("click", function () {
  const container = document.querySelector(".edit-slot-container");
  console.log("Container ",container);
  addRow(container);
});
