import React from 'react';
import './loading-modal.style.scss';
import { ILoadingModalProps } from './loading-modal.type';

const prefixClassName = 'loading-modal';

export const LoadingModal: React.FC<ILoadingModalProps> = ({ textOnLoading = 'Connecting to client...' }) => {
  return (
    <div className={prefixClassName}>
      <div
        className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center"
        style={{ background: 'rgba(0, 0, 0, 0.3)' }}
      >
        <div className="bg-white border py-2 px-5 rounded-lg flex items-center flex-col">
          <div className="loader-dots block relative w-20 h-5 mt-2">
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-teal-200" />
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-teal-200" />
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-teal-200" />
            <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-teal-200" />
          </div>
          <div className="text-gray-500 text-xs font-medium mt-2 text-center">{textOnLoading}</div>
        </div>
      </div>
    </div>
  );
};
