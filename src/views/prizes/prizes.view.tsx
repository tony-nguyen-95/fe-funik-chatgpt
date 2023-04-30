import React from 'react';
import { Button } from 'react-bootstrap';
import './prizes.style.scss';
import { IPrizesProps } from './prizes.type';
import prizeSpecial from '../../assets/prizeSpecial.png';
import prizeSecond from '../../assets/prizeSecond.png';
import prizeThird from '../../assets/prizeThird.png';
import hoaMai from '../../assets/decorator-2.png';
import { CoreAuthenticationStore, CorePageStore } from '../../stores';
import { useHistory } from 'react-router-dom';
import { EPopUp } from '../../stores/store-page/store';
import { useTranslation } from 'react-i18next';

const prefixClassName = 'prizes';

export const Prizes: React.FC<IPrizesProps> = (props) => {
  const {
    hasDecorator = true,
    background = 'white',
    buttonColor = 'var(--btn-primary)',
    colorButton = 'black',
    widthButton = '55%',
  } = props;

  const { t } = useTranslation();

  const history = useHistory();

  const isLogin = CoreAuthenticationStore.isLoginSelector();
  return (
    <div className={`${prefixClassName}__prizes-wrapper`} style={{ backgroundColor: background }}>
      {/* {hasDecorator && <img className={`${prefixClassName}__prizes-flower-top`} src={hoaMai} alt="" />} */}
      <h1 className="m-0 pb-2">{t('prize.title')}</h1>
      <div className={`${prefixClassName}__prizes-item`}>
        <div className={`${prefixClassName}__prizes-image`}>
          <img src={prizeSpecial} alt="prize" />
          <h1>{t('prize.1st')}</h1>
        </div>
        <div className={`${prefixClassName}__prizes-item-content`}>
          {/* <p>{t('prize.1st-pill')}</p> */}
          <p dangerouslySetInnerHTML={{ __html: t('prize.1st-description') }} />
        </div>
      </div>
      <div className={`${prefixClassName}__prizes-item`}>
        <div className={`${prefixClassName}__prizes-image`}>
          <img src={prizeSecond} alt="prize" />
          <h1>{t('prize.2nd')}</h1>
        </div>
        <div className={`${prefixClassName}__prizes-item-content`}>
          {/* <p className="text-dark bg-warning">{t('prize.2nd-pill')}</p> */}
          <p dangerouslySetInnerHTML={{ __html: t('prize.2nd-description') }} />
        </div>
      </div>
      <div className={`${prefixClassName}__prizes-item mb-4`}>
        <div className={`${prefixClassName}__prizes-image`}>
          <img src={prizeThird} alt="prize" />
          <h1>{t('prize.3rd')}</h1>
        </div>
        <div className={`${prefixClassName}__prizes-item-content`}>
          {/* <p className="text-light bg-primary">{t('prize.3rd-pill')}</p> */}
          <p dangerouslySetInnerHTML={{ __html: t('prize.3rd-description') }} />
        </div>
      </div>

      {!isLogin ? (
        <Button
          style={{ color: colorButton, background: buttonColor, width: widthButton }}
          onClick={() => CorePageStore.updatePopupAction(EPopUp.LOGIN_JOURNEY1)}
        >
          {t('common.join-contest')}
        </Button>
      ) : (
        <Button
          style={{ color: colorButton, background: buttonColor, width: widthButton }}
          onClick={() => history.push('?screen=form-contest')}
        >
          {t('common.add-more-post')}
        </Button>
      )}
      {hasDecorator && <img className={`${prefixClassName}__prizes-flower-bottom`} src={hoaMai} alt="" />}
    </div>
  );
};
