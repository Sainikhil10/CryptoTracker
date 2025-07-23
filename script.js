const coinList = document.getElementById('coin-list');
const searchInput = document.getElementById('search');

let coinsData = [];

async function fetchCoins() {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
    );
    coinsData = await res.json();
    displayCoins(coinsData);
  } catch (error) {
    coinList.innerHTML = '<p>Failed to load data. Please try again later.</p>';
    console.error('Error fetching coins:', error);
  }
}

function displayCoins(coins) {
  coinList.innerHTML = '';

  coins.forEach((coin) => {
    const coinCard = document.createElement('div');
    coinCard.className = 'coin-card';

    const changeClass = coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative';

    coinCard.innerHTML = `
      <img src="${coin.image}" alt="${coin.name}" />
      <div class="coin-info">
        <div class="coin-name">${coin.name} (${coin.symbol.toUpperCase()})</div>
        <div class="coin-price">$${coin.current_price.toLocaleString()}</div>
        <div class="coin-change ${changeClass}">
          ${coin.price_change_percentage_24h.toFixed(2)}%
        </div>
      </div>
    `;

    coinList.appendChild(coinCard);
  });
}

function filterCoins() {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = coinsData.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm) ||
    coin.symbol.toLowerCase().includes(searchTerm)
  );
  displayCoins(filtered);
}

// Refresh data every 60 seconds for "live" effect
fetchCoins();
setInterval(fetchCoins, 60000);
