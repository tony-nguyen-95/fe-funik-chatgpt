import React, { useEffect } from 'react';
import './home.style.scss';
import { IHomeProps } from './home.type';
import tetBanner from '../../assets/Tet your way KV 1.png';
import tetBannerDesktop from '../../assets/KV1-desktop.png';

import tetBannerEng from '../../assets/Tet your way KV 1-eng.png';
import tetBannerDesktopEng from '../../assets/KV1-desktop-eng.png';

import { Button } from 'react-bootstrap';
import { CoreAuthenticationStore, CorePageStore } from '../../stores';
import { Loading, PopupModal } from '../../components';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { EPopUp } from '../../stores/store-page/store';
import { NavBar, PostList, Prizes, SocialShare } from '../../views';
import { Footer } from '../../views/footer';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from '../../hooks';

const prefixClassName = 'home';

export const Home: React.FC<IHomeProps> = observer((props) => {
  const history = useHistory();

  const isLogin = CoreAuthenticationStore.isLoginSelector();

  const loadingLogin = CoreAuthenticationStore.loadingSigninSelector();

  const lang = CorePageStore.languageSelector();

  const { t } = useTranslation();

  const { width } = useWindowDimensions();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {loadingLogin && <Loading />}

      <NavBar />
      <div className={prefixClassName}>
        <div className={`${prefixClassName}__rule-wrapper`}>
          {lang === 'en' ? (
            <img width="100%" src={width >= 992 ? tetBannerDesktopEng : tetBannerEng} alt="banner" />
          ) : (
            <img width="100%" src={width >= 992 ? tetBannerDesktop : tetBanner} alt="banner" />
          )}
          <div className={`${prefixClassName}__rule mt-4`}>
            <p className="mb-3 ">
              <i className="text-warning">{t('end-contest.note')}</i>
            </p>
            <p className="mb-3">
              <i className="text-warning">{t('end-contest.note-warning')}</i>
            </p>

            <p className="mb-3">{t('rule.short')}</p>
            {/* <div className={`${prefixClassName}__rule-more`} onClick={() => history.push('?screen=rule')}>
              <p>{t('common.read-more')}</p>
              <i className="fa-solid fa-play" />
            </div> */}
            {!isLogin ? (
              <Button onClick={() => CorePageStore.updatePopupAction(EPopUp.LOGIN_JOURNEY1)}>
                {t('common.join-contest')}
              </Button>
            ) : (
              <Button onClick={() => history.push('?screen=form-contest')}>{t('common.add-more-post')}</Button>
            )}
          </div>
        </div>

        <Prizes />

        <PostList />

        <SocialShare />

        <Footer />

        <PopupModal />
      </div>
    </div>
  );
});
