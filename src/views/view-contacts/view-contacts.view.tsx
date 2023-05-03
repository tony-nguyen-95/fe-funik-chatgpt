import React from 'react';
import { IViewContactsProps } from './view-contacts.type';

import { AiFillCloseSquare } from 'react-icons/ai';
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
      <div className="bg-white min-w-[40%] min-h-[40%] flex flex-col justify-center items-center rounded-lg relative animate-popup">
        <div className="absolute top-2 right-2">
          <button className="text-2xl text-red-500 hover:text-red-700" onClick={() => setPopup(false)}>
            <AiFillCloseSquare size={45} />
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-center border-b-2 border-gray-300 py-2 w-2/3">Thông tin liên hệ</h2>
        <div className="w-full h-full pl-16 mt-10">
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
