import { useEffect, useState } from "react";
import axios from "axios";
import Currency from "./Currency";

const Sidebar = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8172/api/v1/wallet/balance",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        setCurrencies(response.data.data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchCurrencies();
  }, []);

  return (
    <div className="w-1/4 h-screen p-4 bg-gray-200">
      <h2 className="text-lg font-bold mb-4 text-black">Balances</h2>
      <ul>
        {currencies.map((currency, index) => (
          <Currency
            key={index}
            currencyCode={currency.currency}
            amount={currency.amount}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
