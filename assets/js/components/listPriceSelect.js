
// Function to create and append an option to a select element
function createOption(selectElement, value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.text = text;
  selectElement.appendChild(option);
}

// Function to populate the min and max price select elements
function populatePriceSelects(minSelect, maxSelect) {
  // Assuming you have a range of prices, modify this based on your data
  const minPrices = [0, 10000, 50000, 100000, 200000];
  const maxPrices = [250000, 500000, 750000, 1000000, 2000000, 5000000, 10000000];

  // Populate Min Price select
  minPrices.forEach(price => {
    createOption(minSelect, price, `Rp ${price.toLocaleString('id-ID')}`);
  });

  // Populate Max Price select
  maxPrices.forEach(price => {
    createOption(maxSelect, price, `Rp ${price.toLocaleString('id-ID')}`);
  });
}

// Execute when the DOM is fully loaded
export const selectPrices = document.addEventListener('DOMContentLoaded', () => {
  const minPriceSelect = document.getElementById('minPrice');
  const maxPriceSelect = document.getElementById('maxPrice');

  populatePriceSelects(minPriceSelect, maxPriceSelect);
});
