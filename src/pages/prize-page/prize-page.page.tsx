import React from 'react';
import { Footer, NavBar, Prizes } from '../../views';
import './prize-page.style.scss';
import { IPrizePageProps } from './prize-page.type';

const prefixClassName = 'prize-page';

export const PrizePage: React.FC<IPrizePageProps> = (props) => {
  return (
    <>
      <NavBar isWhite />

      <div className={prefixClassName}>
        <Prizes hasDecorator={false} buttonColor="var(--primary)" colorButton="white" widthButton="100%" />
      </div>

      <Footer />
    </>
  );
};
