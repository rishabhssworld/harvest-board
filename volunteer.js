// volunteer.js - Saturday sorting crew sign-up
// WARNING: this file has planted bugs for Applied Activity 5, Mission 4.

const volunteerForm = document.querySelector("#volunteer-form");
const nameInput = document.querySelector("#volunteer-name");
const roleSelect = document.querySelector("#volunteer-role");
const volunteerList = document.querySelector("#volunteer-list");
const volunteerMessage = document.querySelector("#volunteer-message");
const countText = document.querySelector("#volunteer-count");

const maxSpots = 5;
const filled = 0;

function addVolunteer(name, role) {
  const item = document.createElement("li");
  item.innerHTML = "<strong>" + name + "</strong> (" + role + ")";
  volunteerList.appendChild(item);
}

volunteerForm.addEventListener("submit", (event) => {
  let volunteerName = nameInput.value.trim();

  if (volunteerName = "") {
    volunteerMessage.textContent = "Please type your name first.";
    return;
  }

  if (filled > maxSpots) {
    volunteerMessage.textContent = "All spots are filled. Thank you!";
    return;
  }

  volunteerMessage.textContent = "";
  addVolunteer(volunteerName, roleSelect.value);
  filled = filled + 1;
  countText.textContent = filled + " of " + maxSpots + " spots filled";
  nameInput.value = "";
});
