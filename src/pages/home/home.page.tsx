import React, { useEffect } from 'react';
import './home.style.scss';
import { IHomeProps } from './home.type';

// import { CorePageStore } from '../../stores';
// import { Loading } from '../../components';
import { observer } from 'mobx-react';
// import { useHistory } from 'react-router-dom';
// import { NavBar } from '../../views';
// import { Footer } from '../../views/footer';
// import { useTranslation } from 'react-i18next';
// import { useWindowDimensions } from '../../hooks';

// const prefixClassName = 'home';

export const Home: React.FC<IHomeProps> = observer((props) => {
  // const history = useHistory();
  // const lang = CorePageStore.languageSelector();
  // const { t } = useTranslation();
  // const { width } = useWindowDimensions();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      HOME PAGE
    </div>
  );
});
