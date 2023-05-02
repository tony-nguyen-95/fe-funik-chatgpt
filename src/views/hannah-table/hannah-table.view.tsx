import React from 'react';
import { IHannahTableProps } from './hannah-table.type';

const prefixClassName = 'hannah-table';

export const HannahTable: React.FC<IHannahTableProps> = (props) => {
  return <div className={prefixClassName}>HannahTable</div>;
};
