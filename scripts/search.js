'use strict';

// Product search uses the shared quote product options from quote.js.
const searchDialog = document.getElementById('searchDialog');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const productPages = {
  Flyers: 'flyers.html',
  'Name badges': 'name-badges.html',
  'Business Cards': 'business-cards.html',
  Posters: 'posters.html',
  'Pull up Banners': 'pull-up-banners.html',
};
const productNames = Array.from(productSelect.options)
  .map((option) => option.value)
  .filter((name) => name !== 'Something else');
function renderSearch() {
  const query = searchInput.value.trim().toLowerCase();
  const matches = productNames.filter((name) => name.toLowerCase().includes(query));
  searchResults.replaceChildren();
  matches.forEach((name) => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = productPages[name] || '#quote';
    link.textContent = name;
    link.addEventListener('click', (event) => {
      if (productPages[name]) return;
      event.preventDefault();
      searchDialog.close();
      openQuote(name);
    });
    li.append(link);
    searchResults.append(li);
  });
  document.getElementById('searchStatus').textContent = matches.length
    ? `${matches.length} products found.`
    : 'No matching products. Email us for custom printing options.';
}
document.getElementById('searchButton').addEventListener('click', () => {
  searchInput.value = '';
  renderSearch();
  searchDialog.showModal();
  searchInput.focus();
});
searchInput.addEventListener('input', renderSearch);
