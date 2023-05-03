import React from 'react';
import { IFooterProps } from './footer.type';
import { observer } from 'mobx-react';

const prefixClassName = 'footer';

export const Footer: React.FC<IFooterProps> = observer((props) => {
  return <div className={prefixClassName}>footer</div>;
});
