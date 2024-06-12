
const ctx = document.getElementById('bitcoin-chart').getContext('2d');
let bitcoinChart;

const fetchData = async () => {
  try {
    const response = await axios.get('https://api.coincap.io/v2/assets/bitcoin/history?interval=d1');
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error('Error fetching Bitcoin data:', error);
    return null;
  }
};

const renderChart = (labels, prices) => {
  if (bitcoinChart) {
    bitcoinChart.destroy();
  }
  
  bitcoinChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Bitcoin Price',
        data: prices,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
};

const fetchAndRenderData = async () => {
  const data = await fetchData();
  if (data) {
    const labels = data.map(item => item.date);
    const prices = data.map(item => item.priceUsd);
    renderChart(labels, prices);
  }
};

fetchAndRenderData();