import React, { useEffect } from 'react';
import { IMainRouteProps } from './index.type';
import { observer } from 'mobx-react';
import { CorePageStore } from '../stores';
import { Home } from '../pages';
import { useTranslation, withTranslation } from 'react-i18next';

const prefixClassName = 'home-page';

const MainRoute: React.FC<IMainRouteProps> = observer((props) => {
  // const pages = CorePageStore.pageSelector();
  const lang = CorePageStore.languageSelector();

  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang === 'en') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('vi');
    }
  }, [i18n, lang]);

  return (
    <div className={prefixClassName}>
      {/* {pages === 'HOME' && <Home />} */}
      <Home />
    </div>
  );
});

export default withTranslation()(MainRoute);
