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

for (const itemCard of itemCards) {
  const itemName = itemCard.querySelector("h3").textContent;
  const option = document.createElement("option");
  option.value = itemName;
  option.textContent = itemName;
  donationItem.appendChild(option);
}

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
