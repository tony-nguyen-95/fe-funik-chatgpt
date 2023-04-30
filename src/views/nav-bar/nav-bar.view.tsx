import React, { useState } from 'react';
import { Container, Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap';
import { INavBarProps } from './nav-bar.type';
import './nav-bar.style.scss';
import { observer } from 'mobx-react';
import { CoreAuthenticationStore, CorePageStore, CoreUserStore } from '../../stores';
import logo from '../../assets/TVLK_Logo_Life Your Way_VN_on White_Horizontal 1.png';
import logo2 from '../../assets/TVLK_Logo_Life Your Way_VN_on White_Horizontal 2.png';
import Avatar from 'react-avatar';
import { useHistory } from 'react-router-dom';
import profile from '../../assets/profile.svg';
import profileBlue from '../../assets/profileBlue.svg';
import { EPopUp } from '../../stores/store-page/store';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from '../../hooks';

const prefixClassName = 'navbar-view';

export const NavBar: React.FC<INavBarProps> = observer((props) => {
  const { isWhite } = props;

  const { width } = useWindowDimensions();

  const { t } = useTranslation();

  const history = useHistory();

  const userProfile = CoreUserStore.userProfileSelector();

  const isLogin = CoreAuthenticationStore.isLoginSelector();

  const [expanded, setExpanded] = useState(false);

  return (
    <div className={prefixClassName} style={{ background: isWhite ? 'white' : 'var(--primary)' }}>
      <Navbar expand="lg" expanded={expanded}>
        <Container className="w-100">
          <div className={`${prefixClassName}__nav-left`} style={{ maxWidth: '62%' }}>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={() => setExpanded(!expanded)}
              className={isWhite ? 'is-white' : ''}
            />
            <Navbar.Brand onClick={() => history.push('')}>
              <img src={isWhite ? logo2 : logo} alt="tvlk" width={width >= 300 ? '72%' : '65%'} />
            </Navbar.Brand>
          </div>

          <Navbar.Collapse id="basic-navbar-nav" className={isWhite && width >= 992 ? 'response-desktop-nav' : ''}>
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => {
                  setExpanded(false);
                  history.push('');
                }}
              >
                {t('nav.home')}
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  setExpanded(false);
                  if (isLogin) {
                    history.push('?screen=form-contest');
                  } else {
                    CorePageStore.updatePopupAction(EPopUp.LOGIN_JOURNEY1);
                  }
                }}
              >
                {t('nav.join-contest')}
              </Nav.Link>
              <Nav.Link onClick={() => history.push('?screen=list-post')}>{t('nav.post-list')}</Nav.Link>
              <Nav.Link onClick={() => history.push('?screen=prize')}>{t('nav.prize')}</Nav.Link>
              <Nav.Link onClick={() => history.push('?screen=rule')}>{t('nav.rule')}</Nav.Link>
              <Nav.Link href="https://www.traveloka.com/vi-vn/promotion/baytet23">{t('nav.booking')}</Nav.Link>
              <i
                className="fa-solid fa-xmark"
                style={{ border: '1px solid white', borderRadius: '4px', padding: '0.5rem 0.75rem' }}
                onClick={() => setExpanded(false)}
              />
            </Nav>
          </Navbar.Collapse>

          {userProfile ? (
            <div className={`${prefixClassName}__nav-right`}>
              <Avatar src={userProfile?.avatar} alt={userProfile?.name} round size="32" />
              {/* <h6 className={isWhite ? 'text-dark' : 'text-light'}>
                {userProfile?.name.split(' ')[userProfile?.name.split(' ').length - 1]}
              </h6> */}
              <DropdownButton
                id={isWhite ? 'dropdown-basic-button-white' : 'dropdown-basic-button'}
                style={{ padding: '0 0.125rem' }}
                // eslint-disable-next-line no-unsafe-optional-chaining
                title={userProfile?.name.split(' ')[userProfile?.name.split(' ').length - 1]}
              >
                <Dropdown.Item onClick={() => CoreAuthenticationStore.logOutAction()}>
                  {t('profile.log-out')}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => history.push(`?profile=${userProfile.id}`)}>
                  {t('profile.my-profile')}
                </Dropdown.Item>
              </DropdownButton>
            </div>
          ) : (
            <div
              className={`${prefixClassName}__nav-right-none-profile`}
              onClick={() => {
                CorePageStore.updatePopupAction(EPopUp.LOGIN_EMPTY);
              }}
            >
              <Avatar src={isWhite ? profileBlue : profile} round size="24" />
            </div>
          )}
        </Container>
      </Navbar>
    </div>
  );
});
