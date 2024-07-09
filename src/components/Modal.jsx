import React from "react";

export default function Modal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="mb-4">Deseja realmente excluir esta transação?</p>
        <div className="flex justify-center">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Confirmar
          </button>

          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
