const itemCards = document.querySelectorAll(".item-list li");
const searchInput = document.querySelector("#item-search");
const searchForm = document.querySelector("#item-search-form");
const itemCount = document.querySelector("#item-count");
const noItems = document.querySelector("#no-items");
const donationItem = document.querySelector("#donation-item");
const donationForm = document.querySelector("#donation-form");
const donorNameInput = document.querySelector("#donor-name");
const donationQuantityInput = document.querySelector("#donation-qty");
const donationMessage = document.querySelector("#donation-message");
const donationList = document.querySelector("#donation-list");
const totalPledgedText = document.querySelector("#total-pledged");
const receivedCountText = document.querySelector("#received-count");
let totalPledged = 0;

for (const itemCard of itemCards) {
  const itemName = itemCard.querySelector("h3").textContent;
  const option = document.createElement("option");
  option.value = itemName;
  option.textContent = itemName;
  donationItem.appendChild(option);
}

function updateTallies() {
  const allPledges = donationList.querySelectorAll("li");
  const receivedPledges = donationList.querySelectorAll("li.done").length;

  totalPledgedText.textContent = `Total pledged: ${totalPledged} items`;
  receivedCountText.textContent = `Received: ${receivedPledges} of ${allPledges.length} pledges`;
}

updateTallies();

donationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const donorName = donorNameInput.value.trim();
  const quantityText = donationQuantityInput.value.trim();
  const quantity = Number(quantityText);

  if (donorName === "") {
    donationMessage.textContent = "Please type your name.";
    return;
  }

  if (quantityText === "") {
    donationMessage.textContent = "Please type a quantity.";
    return;
  }

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 500) {
    donationMessage.textContent =
      "Quantity must be a whole number from 1 to 500.";
    return;
  }

  donationMessage.textContent = "";

  const pledgeRow = document.createElement("li");

  const pledgeLabel = document.createElement("label");
  const receivedCheckbox = document.createElement("input");
  receivedCheckbox.type = "checkbox";

  const pledgeText = document.createElement("span");
  pledgeText.textContent = `${donorName}: ${quantity} x ${donationItem.value}`;

  pledgeLabel.appendChild(receivedCheckbox);
  pledgeLabel.appendChild(pledgeText);
  pledgeRow.appendChild(pledgeLabel);

  receivedCheckbox.addEventListener("change", () => {
    pledgeRow.classList.toggle("done", receivedCheckbox.checked);
    updateTallies();
  });

  donationList.appendChild(pledgeRow);
  totalPledged += quantity;
  updateTallies();

  donorNameInput.value = "";
  donationQuantityInput.value = "";
  donorNameInput.focus();
});

function filterItems(searchText) {
  const normalizedSearch = searchText.trim().toLowerCase();
  let visibleCount = 0;

  for (const itemCard of itemCards) {
    const itemName = itemCard.querySelector("h3").textContent.toLowerCase();
    const matches = itemName.includes(normalizedSearch);

    itemCard.classList.toggle("hidden", !matches);

    if (matches) {
      visibleCount += 1;
    }
  }

  noItems.classList.toggle("hidden", visibleCount !== 0);

  itemCount.textContent = `Showing ${visibleCount} of ${itemCards.length} items`;
}

searchInput.addEventListener("input", () => {
  filterItems(searchInput.value);
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

filterItems(searchInput.value);
