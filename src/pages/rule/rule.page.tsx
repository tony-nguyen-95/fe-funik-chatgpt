import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { PopupModal } from '../../components';
import { CoreAuthenticationStore, CorePageStore } from '../../stores';
import { EPopUp } from '../../stores/store-page/store';
import { NavBar, Footer } from '../../views';
import './rule.style.scss';
import { IRuleProps } from './rule.type';

const prefixClassName = 'rule';

export const Rule: React.FC<IRuleProps> = (props) => {
  const history = useHistory();

  const { t } = useTranslation();

  const isLogin = CoreAuthenticationStore.isLoginSelector();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar isWhite />
      <div className={prefixClassName}>
        <h1>{t('contest-rule.title')}</h1>
        <div dangerouslySetInnerHTML={{ __html: t('contest-rule.full-html-rule') }} />
        {!isLogin ? (
          <Button onClick={() => CorePageStore.updatePopupAction(EPopUp.LOGIN_JOURNEY1)}>
            {t('common.join-contest')}
          </Button>
        ) : (
          <Button onClick={() => history.push('?screen=form-contest')}>{t('common.add-more-post')}</Button>
        )}
      </div>
      <Footer />
      <PopupModal />
    </>
  );
};
