'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setCurrency, setShowDecimals } from '@/store/slices/settingsSlice';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
];

const SettingsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currency, showDecimals } = useSelector((state: RootState) => state.settings);
  
  const [localCurrency, setLocalCurrency] = useState(currency);
  const [localShowDecimals, setLocalShowDecimals] = useState(showDecimals);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setLocalCurrency(currency);
    setLocalShowDecimals(showDecimals);
  }, [currency, showDecimals, setLocalCurrency, setLocalShowDecimals]);

  const handleSave = () => {
    dispatch(setCurrency(localCurrency));
    dispatch(setShowDecimals(localShowDecimals));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Display Preferences</h3>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              id="currency"
              value={localCurrency}
              onChange={(e) => setLocalCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.name} ({curr.symbol} {curr.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showDecimals"
                checked={localShowDecimals}
                onChange={(e) => setLocalShowDecimals(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showDecimals" className="ml-2 block text-sm text-gray-700">
                Show decimal places (e.g., {localCurrency} 100{localShowDecimals ? '.00' : ''})
              </label>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {localShowDecimals 
                ? 'Amounts will be displayed with 2 decimal places (e.g., 100.00)'
                : 'Amounts will be displayed as whole numbers (e.g., 100)'}
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
            {isSaved && (
              <p className="mt-2 text-sm text-green-600">
                Settings saved successfully!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
