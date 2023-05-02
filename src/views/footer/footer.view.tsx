import React from 'react';
import './footer.style.scss';
import { IFooterProps } from './footer.type';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';

const prefixClassName = 'footer';

export const Footer: React.FC<IFooterProps> = observer((props) => {
  const { t } = useTranslation();

  return <div className={prefixClassName}>footer</div>;
});
