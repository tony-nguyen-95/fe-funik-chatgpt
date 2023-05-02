import React, { useEffect } from 'react';
import { ILoginRouteProps } from './login.type';
import { observer } from 'mobx-react';
import { CorePageStore } from '../stores';
import { Login } from '../pages';
import { useTranslation, withTranslation } from 'react-i18next';

const prefixClassName = 'login-page';

const LoginRoute: React.FC<ILoginRouteProps> = observer((props) => {
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
      <Login />
    </div>
  );
});

export default withTranslation()(LoginRoute);
