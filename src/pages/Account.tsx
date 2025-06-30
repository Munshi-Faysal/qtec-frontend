import React, { useState, useMemo } from 'react';
import { useFetch } from '../hooks/useFetch';
import { usePost } from '../hooks/usePost';
import type { Account } from '../models/Account';

const Accounts: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { data: accounts, loading, error } = useFetch<Account[]>(`Accounts/Get?refresh=${refreshKey}`);
  const { postData, loading: posting, error: postError } = usePost<Account>();

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Sorting state
  const [sortField, setSortField] = useState<'name' | 'type' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const validateForm = () => {
    if (!name.trim()) return 'Name is required.';
    if (!type.trim()) return 'Type is required.';
    return null;
  };

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    const newAccount = { name, type };
    try {
      await postData('Accounts/Create', newAccount);
      setName('');
      setType('');
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      // postError will show automatically from hook
    }
  };

  const sortedAccounts = useMemo(() => {
    if (!Array.isArray(accounts)) return [];
    if (!sortField) return accounts;

    return [...accounts].sort((a, b) => {
      const valA = a[sortField].toLowerCase();
      const valB = b[sortField].toLowerCase();
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [accounts, sortField, sortOrder]);

  const toggleSort = (field: 'name' | 'type') => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Accounts</h1>

      {/* Add Account Form */}
      <form onSubmit={handleAddAccount} className="mb-10 space-y-5 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Account</h2>

        <div>
          <label className="block mb-1 font-medium text-gray-600">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter account name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-600">Type</label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Enter account type (Asset, Liability, etc.)"
          />
        </div>

        {formError && <p className="text-red-600 font-semibold">{formError}</p>}
        {postError && <p className="text-red-600 font-semibold">{postError.message}</p>}

        <button
          type="submit"
          disabled={posting}
          className={`w-full bg-blue-600 text-white py-3 rounded font-semibold transition ${
            posting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          {posting ? 'Adding Account...' : 'Add Account'}
        </button>
      </form>

      {/* Accounts Table */}
      <div className="overflow-x-auto bg-white rounded shadow-md">
        {loading ? (
          <div className="flex justify-center py-12">
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        ) : error ? (
          <p className="text-center text-red-600 py-10">{error.message}</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => toggleSort('name')}
                >
                  Name{' '}
                  {sortField === 'name' ? (
                    sortOrder === 'asc' ? (
                      '▲'
                    ) : (
                      '▼'
                    )
                  ) : null}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => toggleSort('type')}
                >
                  Type{' '}
                  {sortField === 'type' ? (
                    sortOrder === 'asc' ? (
                      '▲'
                    ) : (
                      '▼'
                    )
                  ) : null}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedAccounts.length > 0 ? (
                sortedAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{account.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.type}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-gray-500">
                    No accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </div>
  );
};

export default Accounts;
