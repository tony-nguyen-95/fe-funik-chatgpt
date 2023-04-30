import React, { useMemo } from 'react';
import './footer.style.scss';
import { IFooterProps } from './footer.type';
import facebookFooter from '../../assets/facebook.png';
import instagramFooter from '../../assets/insta.png';
import youtubeFooter from '../../assets/youtube.png';
import tiktokFooter from '../../assets/tiktok.png';
import appstore from '../../assets/appstore.png';
import ggplay from '../../assets/googleplay.png';
import { CorePageStore } from '../../stores';
import { EPopUp } from '../../stores/store-page/store';
import { PopupModal } from '../../components';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

const prefixClassName = 'footer';

export const Footer: React.FC<IFooterProps> = observer((props) => {
  const { t } = useTranslation();

  const history = useHistory();

  const lang = CorePageStore.languageSelector();

  const allQuery = useMemo(() => location.search, [location]);

  return (
    <div className={prefixClassName}>
      <div className={`${prefixClassName}__footer-wrapper`}>
        <div className={`${prefixClassName}__footer-share-social`}>
          <a target="_blank" href="https://www.facebook.com/TravelokaVN" rel="noreferrer">
            <img src={facebookFooter} alt="facebook" />
          </a>
          <a target="_blank" href="https://www.instagram.com/travelokavn/" rel="noreferrer">
            <img src={instagramFooter} alt="instagram" />
          </a>
          <a target="_blank" href="https://www.youtube.com/@TravelokaVietnam" rel="noreferrer">
            <img src={youtubeFooter} alt="youtube" />
          </a>
          <a target="_blank" href="https://www.tiktok.com/@traveloka_vn?lang=en" rel="noreferrer">
            <img src={tiktokFooter} alt="tiktok" />
          </a>
        </div>
        <p className={`${prefixClassName}__footer-note`}>{t('footer.download-note')}</p>
        <a
          className="w-50"
          href="https://apps.apple.com/vn/app/traveloka-hotel-flight/id898244857"
          rel="noreferrer"
          target="_blank"
        >
          <img width="100%" src={appstore} alt="traveloka" />
        </a>
        <a
          className="w-50"
          href="https://play.google.com/store/apps/details?id=com.traveloka.android&hl=vi&gl=US&pli=1"
          rel="noreferrer"
          target="_blank"
        >
          <img className="mt-2" width="100%" src={ggplay} alt="traveloka" />
        </a>

        <p className={`${prefixClassName}__footer-copyright`}>Copyright © 2022 Traveloka</p>

        {lang === 'vi' ? (
          <p>
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>VN</span> |{' '}
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                CorePageStore.updateLanguageAction('en');
              }}
            >
              EN
            </span>
          </p>
        ) : (
          <p>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                CorePageStore.updateLanguageAction('vi');
              }}
            >
              VN
            </span>{' '}
            | <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>EN</span>
          </p>
        )}

        <div
          className={`${prefixClassName}__footer-contact`}
          onClick={() => CorePageStore.updatePopupAction(EPopUp.CONTACT_FORM)}
          dangerouslySetInnerHTML={{ __html: t('footer.contact-us') }}
        />

        <i className="fa-solid fa-chevron-up" onClick={() => window.scroll(0, 0)} />
      </div>
      <PopupModal />
    </div>
  );
});
