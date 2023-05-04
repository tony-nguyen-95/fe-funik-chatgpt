import React from 'react';
import { IToolBoxProps } from './toolbox.type';

const prefixClassName = 'toolbox';

export const ToolBox: React.FC<IToolBoxProps> = (props) => {
  return <div className={prefixClassName}>ToolBox</div>;
};
