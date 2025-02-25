import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PiCoinConverter() {
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState("INR");
  const [convertedValue, setConvertedValue] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (amount > 0) {
      convertPiCoin();
    }
  }, [amount, currency]);

  const convertPiCoin = async () => {
    try {
      const response = await axios.get(
        `https://pi-coin-backend.onrender.com/convert?amount=${amount}&currency=${currency}`
      );
      setConvertedValue(response.data.convertedValue);
      setError(null);
    } catch (err) {
      setError("Error fetching conversion rate");
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">Pi Coin Converter</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 mb-2 w-64"
        placeholder="Enter Pi amount"
      />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="border p-2 mb-2 w-64"
      >
        <option value="INR">INR</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
      <button
        onClick={convertPiCoin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Convert
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {convertedValue !== null && (
        <p className="text-lg mt-4">
          {amount} Pi Coin = {convertedValue} {currency}
        </p>
      )}
    </div>
  );
}
