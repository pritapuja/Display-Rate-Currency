import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [rates, setRates] = useState([]);

  const fetchRates = () => {
    axios
      .get('https://api.currencyfreaks.com/v2.0/rates/latest', {
        params: {
          apikey: import.meta.env.VITE_API_KEY,
          base: 'USD'
        }
      })
      .then((response) => {
        const filteredRates = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'].map(currency => ({
          currency,
          rate: parseFloat(response.data.rates[currency]).toFixed(4),
          buy: (parseFloat(response.data.rates[currency]) * 1.02).toFixed(4),
          sell: (parseFloat(response.data.rates[currency]) * 0.98).toFixed(4)
        }));
        setRates(filteredRates);
      })
      .catch((error) => {
        console.error('Error fetching currency rates:', error);
      });
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Currency</th>
            <th scope="col">WE BUY</th>
            <th scope="col">EXCHANGE RATE</th>
            <th scope="col">WE SELL</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {rates.map((rate, index) => (
            <tr key={index}>
              <td>{rate.currency}</td>
              <td>{rate.buy}</td>
              <td>{rate.rate}</td>
              <td>{rate.sell}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
