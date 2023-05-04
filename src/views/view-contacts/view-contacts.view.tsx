import React from 'react';
import { IViewContactsProps } from './view-contacts.type';

import { IoMdCloseCircle } from 'react-icons/io';
import { getContactType } from '../../utils';

const prefixClassName = 'view-contacts';

export const ViewContacts: React.FC<IViewContactsProps> = (props) => {
  const { popup, setPopup, contacts } = props;

  return (
    <div
      className={`fixed h-screen w-screen z-[100] top-1/2 left-1/2 
			transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-gray-900 bg-opacity-50
				${popup ? 'block' : 'hidden'}
			`}
    >
      <div className="bg-white min-w-[19rem] min-h-[20rem] flex flex-col justify-start items-center rounded-lg relative animate-popup">
        <div
          className="absolute top-0 w-full h-12 px-2 flex justify-between items-center border-b-2 border-gray-300
					bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-t-lg"
        >
          <h2 className="text-xl font-semibold text-center text-white">Thông tin liên hệ</h2>
          <button
            className="text-2xl text-red-500 hover:text-red-600 hover:rotate-90 transition-transform duration-300"
            onClick={() => setPopup(false)}
          >
            <IoMdCloseCircle size={40} />
          </button>
        </div>
        <div className="min-w-[16rem] min-h-[17rem] mt-12 flex flex-col justify-center items-start">
          {contacts?.map((contact) => (
            <div key={contact.contactType}>
              <p className="text-lg font-semibold">{getContactType(contact.contactType)}</p>
              {contact.contactType === 3 ? (
                <a
                  href={contact.name ?? ''}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  {contact.name}
                </a>
              ) : (
                <p>{contact.name}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
