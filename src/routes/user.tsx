import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { CorePageStore } from '../stores';
import { User } from '../pages';
import { useTranslation, withTranslation } from 'react-i18next';

const prefixClassName = 'login-page';

const UserRoute: React.FC = observer((props) => {
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
      <User />
    </div>
  );
});

export default withTranslation()(UserRoute);
