import React from 'react';
import { INavBarProps } from './nav-bar.type';
import './nav-bar.style.scss';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
const prefixClassName = 'navbar-view';

export const NavBar: React.FC<INavBarProps> = observer((props) => {
  const { t } = useTranslation();

  return <div className={prefixClassName}></div>;
});
