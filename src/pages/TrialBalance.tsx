import React from 'react';
import { useFetch } from '../hooks/useFetch';

interface TrialBalanceAccount {
  accountId: number;
  accountName: string;
  type: string;
  totalDebit: number; // Total debit amount for the account
  totalCredit: number; // Total credit amount for the account
  totalBalance: number; // positive for debit balance, negative for credit balance or vice versa
}

export const TrialBalance: React.FC = () => {
  const { data: accounts, loading, error } = useFetch<TrialBalanceAccount[]>('Accounts/balances');

  // Ensure accounts is always an array to avoid runtime errors
  const accountList = Array.isArray(accounts) ? accounts : [];

  // Group accounts by type (Asset, Liability, etc.)
  const grouped = React.useMemo(() => {
    if (!accountList.length) return {};

    return accountList.reduce<Record<string, TrialBalanceAccount[]>>((acc, account) => {
      if (!acc[account.type]) acc[account.type] = [];
      acc[account.type].push(account);
      return acc;
    }, {});
  }, [accountList]);

  // Calculate total debit and credit
  const totals = React.useMemo(() => {
    let debitTotal = 0;
    let creditTotal = 0;

    accountList.forEach((acc) => {
      if (acc.totalBalance >= 0) {
        debitTotal += acc.totalBalance;
      } else {
        creditTotal += Math.abs(acc.totalBalance);
      }
    });

    return { debitTotal, creditTotal };
  }, [accountList]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Trial Balance</h2>

      {/* Loading state */}
      {loading && (
        <p className="text-center py-4 text-gray-600 italic">Loading trial balance...</p>
      )}

      {/* Error state */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          <strong className="font-bold">Error:</strong> <span>{error.message}</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && accountList.length === 0 && (
        <div
          className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 text-center"
          role="alert"
        >
          No trial balance data found.
        </div>
      )}

      {/* Data table */}
      {!loading && !error && accountList.length > 0 && (
        <>
          {Object.entries(grouped).map(([type, accs]) => (
            <div key={type} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{type}</h3>
              <table className="w-full border-collapse border border-gray-300 rounded">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 text-left">Account Name</th>
                    <th className="border px-4 py-2 text-right">Net Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {accs.map((acc) => (
                    <tr key={acc.accountId} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{acc.accountName}</td>
                      <td
                        className={`border px-4 py-2 text-right ${
                          acc.totalBalance < 0 ? 'text-red-600' : 'text-green-700'
                        }`}
                      >
                        {(acc.totalBalance ?? 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <div className="mt-6 font-bold text-right text-lg">
            <p>
              Total Debit: <span className="text-green-700">{(totals.debitTotal ?? 0).toFixed(2)}</span>

            </p>
            <p>
              Total Credit: <span className="text-red-600">{(totals.creditTotal ?? 0).toFixed(2)}</span>

            </p>
          </div>
        </>
      )}
    </div>
  );
};
