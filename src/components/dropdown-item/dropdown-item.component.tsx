import React, { useMemo, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import './dropdown-item.style.scss';
import { IDropdownItemProps } from './dropdown-item.type';

const prefixClassName = 'dropdown-item';

export const DropdownItem: React.FC<IDropdownItemProps> = (props) => {
  const { title, subMenu } = props;

  const [show, setShow] = useState(false);

  const titleNav: React.ReactNode = useMemo(() => {
    return (
      <div className={`${prefixClassName}__title`}>
        <div>{title}</div>
        <i style={{ transform: 'rotate(0deg)' }} className="fa-solid fa-angle-up" />
      </div>
    );
  }, [title]);

  return (
    <NavDropdown
      title={titleNav}
      show={show}
      onMouseEnter={() => setShow(!show)}
      onMouseLeave={() => setShow(false)}
      className={prefixClassName}
    >
      {subMenu &&
        subMenu.map((item, index) =>
          item.isText ? (
            <NavDropdown.ItemText key={item.subTitle}>{item.subTitle}</NavDropdown.ItemText>
          ) : (
            <NavDropdown.Item
              key={item.subTitle}
              href={item.link}
              eventKey={item.subTitle}
              onClick={() => {
                if (item.onAciton) {
                  return item.onAciton();
                }
              }}
            >
              {item.subTitle}
            </NavDropdown.Item>
          ),
        )}
    </NavDropdown>
  );
};
