import axios from "axios";
import { useState } from "react";
import Offerings from "./Offerings";
import Button from "./Button";

const GetOffering = () => {
  const currencies = [
    "GHS",
    "USDC",
    "NGN",
    "KES",
    "USD",
    "EUR",
    "GBP",
    "BTC",
    "AD",
    "AUD",
    "MXN",
  ];

  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [offerings, setOfferings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFetchOfferings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8172/api/v1/transaction/offerings",
        { params: { from: fromCurrency, to: toCurrency } }
      );
      setOfferings(response.data.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching offerings:", error);
    }
  };

  handleFetchOfferings();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 bg-gray-200">
      <div className="mb-4">
        <label className="block text-black font-bold mb-2">From:</label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="p-2 border border-gray-400 rounded w-full"
        >
          <option value="" disabled>
            Select a currency
          </option>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-black font-bold mb-2">To:</label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="p-2 border border-gray-400 rounded w-full"
        >
          <option value="" disabled>
            Select a currency
          </option>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <Button title="Get Offerings" onPressed={handleFetchOfferings} />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <h3 className="text-black font-bold mb-4">Offerings</h3>
            <ul>
              {offerings.map((offering, index) => (
                <li key={index} className="mb-2">
                  <Offerings
                    pfiName={offering.pfiName}
                    description={offering.description}
                    rate={offering.rate}
                  />
                </li>
              ))}
            </ul>
            <button
              onClick={closeModal}
              className="bg-gray-800 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetOffering;
