import React, { useState } from "react";

const EditModal = ({ transaction, onSubmit, onCancel }) => {
  const [editedTransaction, setEditedTransaction] = useState({
    ...transaction,
  });

  const handleTypeChange = (e) => {
    setEditedTransaction({
      ...editedTransaction,
      type: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!editedTransaction.type) {
      alert("Please select the transaction type.");
      return;
    }

    onSubmit(editedTransaction);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>
        <label htmlFor="type" className="block mb-2">
          Type:
        </label>
        <select
          id="type"
          name="type"
          value={editedTransaction.type}
          onChange={handleTypeChange}
          className="border border-gray-300 rounded-lg px-3 py-1 mb-4"
        >
          <option value="">Select</option>
          <option value="input">Input</option>
          <option value="output">Output</option>
        </select>
        <label htmlFor="description" className="block mb-2">
          Description:
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={editedTransaction.description}
          onChange={(e) =>
            setEditedTransaction({
              ...editedTransaction,
              description: e.target.value,
            })
          }
          className="border border-gray-300 rounded-lg px-3 py-1 mb-4 w-full"
        />
        <label htmlFor="value" className="block mb-2">
          Value:
        </label>
        <input
          type="number"
          id="value"
          name="value"
          value={editedTransaction.value}
          onChange={(e) =>
            setEditedTransaction({
              ...editedTransaction,
              value: e.target.value,
            })
          }
          className="border border-gray-300 rounded-lg px-3 py-1 mb-4 w-full"
        />
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
