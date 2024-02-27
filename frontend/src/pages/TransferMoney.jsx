import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const TransferMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  console.log('ID:', id);
  console.log('Name:', name);
  console.log(localStorage.getItem('token'));
  const [amount, setAmount] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  const sendMoney = (e) => {
    e.preventDefault();
    axios
      .post(
        'http://localhost:5000/api/v1/account/transfer',
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .then((response) => {
        setAmount(0); // Clear the amount state
        setSuccessMessage('Transaction successful'); // Set success message
      })
      .catch((error) => {
        console.error('Error sending money:', error);
        setSuccessMessage('Transaction failed'); // Set failure message
      });
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">{name[0]}</span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <button
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                onClick={sendMoney}
              >
                Initiate Transfer
              </button>
              {successMessage && <p className="text-green-500">{successMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferMoney;
