const itemCards = document.querySelectorAll(".item-list li");
const searchInput = document.querySelector("#item-search");
const searchForm = document.querySelector("#item-search-form");
const itemCount = document.querySelector("#item-count");
const noItems = document.querySelector("#no-items");

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
