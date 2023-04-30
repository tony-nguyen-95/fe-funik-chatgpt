import React from 'react';
import './social-share.style.scss';
import { ISocialShareProps } from './social-share.type';
// import followTvlk from '../../assets/follow-tvlk-zalo.png';
import tvlkLogo from '../../assets/tvlk-logo.png';
import zalo from '../../assets/zalo.png';

import bannerExploreMore from '../../assets/banner-footer.png';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
// import { useWindowDimensions } from '../../hooks';

const prefixClassName = 'social-share';

export const SocialShare: React.FC<ISocialShareProps> = (props) => {
  const { isWhiteDecorator } = props;

  // const { width } = useWindowDimensions();

  const { t } = useTranslation();

  return (
    <div className={prefixClassName}>
      <div
        className={`${prefixClassName}__community-outside`}
        style={{ background: isWhiteDecorator ? 'white' : 'var(--primary)' }}
      >
        <div
          className={
            !isWhiteDecorator ? `${prefixClassName}__community-wrapper` : `${prefixClassName}__community-wrapper-white`
          }
        >
          <a
            target="_blank"
            href="https://zalo.me/4498034832828454541"
            className={`${prefixClassName}__community-follow-zalo w-100`}
            rel="noreferrer"
          >
            <img src={tvlkLogo} alt="traveloka" width="18%" />
            <div>
              <h6>{t('social.follow-oa-zalo')}</h6>
              <Button className="bg-primary px-1 py-1" style={{ fontSize: 'smaller' }}>
                <img className="me-2" src={zalo} alt="zalo" width="15%" /> {t('social.follow')}
              </Button>
            </div>
          </a>
          <p>{t('social.discovery')}</p>
          <a
            target="_blank"
            href="https://www.traveloka.com/vi-vn/promotion/baytet23"
            className="w-100"
            rel="noreferrer"
          >
            <img src={bannerExploreMore} alt="traveloka" width="100%" />
          </a>
        </div>
      </div>
    </div>
  );
};
