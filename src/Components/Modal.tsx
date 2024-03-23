"use client"
import React, { ReactNode, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex">
      <div className="relative p-8 bg-white w-full md:max-w-md max-w-sm m-auto flex-col flex rounded-lg">
        <div>
          <button
            className="absolute top-0 right-0 m-4 text-gray-700 hover:text-gray-900"
            onClick={onClose}
          >
            &#x2715; {/* Close button (X) */}
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
