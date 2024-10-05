"use client";
import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";

export const TransactionModalButton = () => {
  const { openModal, setOpenModal } = useGlobalContext();
  return (
    <button
      className="px-4 py-2 bg-custom-dark-brown text-white rounded-lg hover:bg-custom-dark-brown transition-colors"
      onClick={() => setOpenModal(true)}
    >
      Open modal
    </button>
  );
};

const TransactionModal: React.FC<any> = ({
  fromAddress,
  toAddress,
  estimatedGas,
}: {
  fromAddress: string;
  toAddress: string;
  estimatedGas: number;
}) => {
  const { openModal, setOpenModal } = useGlobalContext();
  if (!openModal) return null; // Return null when the modal is not visible

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Confirm Transaction
        </h2>
        <div className="space-y-4">
          <p className="text-sm">
            <span className="font-semibold text-gray-700">From:</span> {fromAddress}
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-700">To:</span> {toAddress}
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-700">Estimated Gas:</span> {estimatedGas}
          </p>
        </div>
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setOpenModal(!openModal)}
            className="w-full py-2 mr-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Confirm
          </button>
          <button
            onClick={() => setOpenModal(!openModal)}
            className="w-full py-2 ml-2 bg-red-500 text-white rounded-lg font-semibold shadow-md hover:bg-red-600 transition"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
