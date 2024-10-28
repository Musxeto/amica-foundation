import React from 'react';

const DeleteWarningModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 max-w-sm w-full">
        <h3 className="text-lg font-bold">Delete Confirmation</h3>
        <p>Are you sure you want to delete this project?</p>
        <div className="flex justify-between mt-4">
          <button onClick={onCancel} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-300">Cancel</button>
          <button onClick={onConfirm} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWarningModal;
