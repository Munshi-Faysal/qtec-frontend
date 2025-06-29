import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { usePost } from "../hooks/usePost";
import type { Account } from "../models/Account";

interface JournalEntryLineInput {
  accountId: number | "";
  debit: number;
  credit: number;
}

interface JournalEntry {
  id: number;
  date: string;
  description: string;
  lines: {
    accountId: number;
    debit: number;
    credit: number;
  }[];
}

export const Journal: React.FC = () => {
  const { data: accounts } = useFetch<Account[]>("accounts");
  const {
    data: entries,
    loading: entriesLoading,
    error: entriesError,
    refetch,
  } = useFetch<JournalEntry[]>("journalentries");

  const { postData, loading: submitting, error: submitError } = usePost();

  // Form states
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [lines, setLines] = useState<JournalEntryLineInput[]>([
    { accountId: "", debit: 0, credit: 0 },
  ]);

  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Search/filter state
  const [searchTerm, setSearchTerm] = useState("");

  const totalDebit = lines.reduce(
    (sum, line) => sum + Number(line.debit || 0),
    0
  );
  const totalCredit = lines.reduce(
    (sum, line) => sum + Number(line.credit || 0),
    0
  );
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  const handleLineChange = (
    index: number,
    field: keyof JournalEntryLineInput,
    value: any
  ) => {
    const updated = [...lines];
    updated[index][field] =
      field === "accountId" ? Number(value) : Number(value);
    setLines(updated);
  };

  const addLine = () => {
    setLines([...lines, { accountId: "", debit: 0, credit: 0 }]);
  };

  const removeLine = (index: number) => {
    if (lines.length === 1) return;
    setLines(lines.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccess(null);

    if (!isBalanced) {
      setFormError("Debits and credits must be equal.");
      return;
    }

    try {
      await postData("journalentries", {
        date,
        description,
        lines: lines.map((line) => ({
          accountId: line.accountId,
          debit: line.debit,
          credit: line.credit,
        })),
      });

      setSuccess("Journal entry submitted successfully.");
      setDescription("");
      setLines([{ accountId: "", debit: 0, credit: 0 }]);
      refetch(); // Refresh list after submit
    } catch (err: any) {
      setFormError(err.message || "Failed to submit.");
    }
  };

  // Filter entries based on search term
  const filteredEntries = Array.isArray(entries)
    ? entries.filter((entry) =>
        entry.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Journal</h1>

        <section className="mb-10 space-y-5 bg-white p-6 rounded shadow-md">
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Journal Entry
            </h2>
            {/* Date */}
            <div>
              <label className="block font-semibold mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border px-3 py-2 rounded w-full"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold mb-1">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border px-3 py-2 rounded w-full"
              />
            </div>

            {/* Lines */}
            <div>
              <label className="block font-semibold mb-2">Entry Lines</label>

              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-2 py-1 text-left">Account</th>
                    <th className="border px-2 py-1 text-right">Debit</th>
                    <th className="border px-2 py-1 text-right">Credit</th>
                    <th className="border px-2 py-1 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((line, index) => (
                    <tr key={index}>
                      <td className="border px-2 py-1">
                        <select
                          value={line.accountId}
                          onChange={(e) =>
                            handleLineChange(index, "accountId", e.target.value)
                          }
                          className="w-full border rounded px-2 py-1"
                        >
                          <option value="">Select account</option>
                          {Array.isArray(accounts) &&
                            accounts.map((acc) => (
                              <option key={acc.id} value={acc.id}>
                                {acc.name} ({acc.type})
                              </option>
                            ))}
                        </select>
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="number"
                          value={line.debit}
                          onChange={(e) =>
                            handleLineChange(index, "debit", e.target.value)
                          }
                          className="w-full border rounded px-2 py-1 text-right"
                        />
                      </td>
                      <td className="border px-2 py-1">
                        <input
                          type="number"
                          value={line.credit}
                          onChange={(e) =>
                            handleLineChange(index, "credit", e.target.value)
                          }
                          className="w-full border rounded px-2 py-1 text-right"
                        />
                      </td>
                      <td className="border px-2 py-1 text-center">
                        <button
                          type="button"
                          onClick={() => removeLine(index)}
                          className="text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="font-semibold bg-gray-50">
                    <td className="border px-2 py-2 text-right">Total</td>
                    <td className="border px-2 py-2 text-right">
                      {totalDebit.toFixed(2)}
                    </td>
                    <td className="border px-2 py-2 text-right">
                      {totalCredit.toFixed(2)}
                    </td>
                    <td className="border px-2 py-2"></td>
                  </tr>
                </tbody>
              </table>

              <button
                type="button"
                onClick={addLine}
                className="mt-2 text-blue-600 hover:underline"
              >
                + Add Line
              </button>
            </div>

            {formError && <p className="text-red-600">{formError}</p>}
            {submitError && (
              <p className="text-red-600">{submitError.message}</p>
            )}
            {success && <p className="text-green-600">{success}</p>}

            <button
              type="submit"
              className={`bg-blue-600 text-white px-4 py-2 rounded ${
                isBalanced
                  ? "hover:bg-blue-700"
                  : "opacity-50 cursor-not-allowed"
              }`}
              disabled={!isBalanced || submitting}
            >
              {submitting ? "Submitting..." : "Submit Entry"}
            </button>
          </form>
        </section>

        {/* Journal Entries List */}
        <section className="mb-10 space-y-5 bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Journal List
          </h2>

          <input
            type="text"
            placeholder="Search description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded w-full mb-4"
          />

          {entriesLoading && <p>Loading entries...</p>}

          {entriesError && <p className="text-red-600">No Record Found</p>}

          {!entriesLoading && !entriesError && filteredEntries.length === 0 && (
            <p className="text-gray-600">No Record Found</p>
          )}

          {!entriesLoading && !entriesError && filteredEntries.length > 0 && (
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Date</th>
                  <th className="border px-2 py-1">Description</th>
                  <th className="border px-2 py-1">Lines Count</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry) => (
                  <tr key={entry.id}>
                    <td className="border px-2 py-1">{entry.date}</td>
                    <td className="border px-2 py-1">{entry.description}</td>
                    <td className="border px-2 py-1 text-center">
                      {entry.lines.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
};
