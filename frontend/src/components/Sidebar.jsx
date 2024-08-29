import { useEffect, useState } from "react";
import axios from "axios";
import Transaction from "./Transaction";

const Sidebar = () => {
  // const [currencies, setCurrencies] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // get transactions data
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8172/api/v1/transactions/wallet",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTransactions(response.data.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, []);

  // useEffect(() => {
  //   const fetchCurrencies = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8172/api/v1/wallet/balance",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       console.log(response);
  //       setCurrencies(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching currencies:", error);
  //     }
  //   };
  //   fetchCurrencies();
  // }, []);

  return (
    <div className="w-1/4 h-screen p-4 bg-gray-200">
      <h2 className="text-lg font-bold mb-4 text-black">Transactions</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <Transaction
            key={index}
            pfiName={transaction.pfiName}
            from={transaction.from}
            to={transaction.to}
            status={transaction.status}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
