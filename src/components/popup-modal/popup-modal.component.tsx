import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { Button, Card, FloatingLabel, Form, FormLabel, ListGroup, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { CoreAuthenticationStore, CorePageStore, CorePostStore, CoreUserStore } from '../../stores';
import { EPopUp } from '../../stores/store-page/store';
import { convertFormatDate } from '../../utils';
import { PaginationComponent } from '../pagination';
import './popup-modal.style.scss';
import { IContactFormModel, IPopupModalProps } from './popup-modal.type';
import loginIcon from '../../assets/login-icon.png';
import loginSuccessIcon from '../../assets/login-check-icon.png';
import error from '../../assets/error.png';
import contact from '../../assets/contact.png';
import totalVote from '../../assets/total-vote.png';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loading } from '../loading';
import { useTranslation } from 'react-i18next';
// import zalo from '../../assets/zalo.png';
// import facebookCircle from '../../assets/facebook-circle.png';
import warningIcon from '../../assets/warning-icon.png';

const prefixClassName = 'popup-modal';

const sessionsPerPage = 4;

const contactSchema = yup.object().shape({
  name: yup.string().required('Please fill out your name'),
  phoneNumber: yup
    .string()
    .required('Please fill out your phone number')
    .min(10, 'Your phone is not valid')
    .matches(/^[0-9]*$/, 'Your phone can not include letters'),
  message: yup
    .string()
    .required('Please fill out your message')
    .max(1000, 'Your message should not exceed 1000 characters'),
});

export const PopupModal: React.FC<IPopupModalProps> = observer((props) => {
  const { forcePost } = props;

  const { t } = useTranslation();

  const history = useHistory();

  const popUpType = CorePageStore.popupSelector();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<IContactFormModel>({
    mode: 'onSubmit',
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = (data: IContactFormModel) => {
    CoreUserStore.contactAction(data.name, data.phoneNumber, data.message);
    reset();
  };

  const handleClose = () => {
    if (popUpType === EPopUp.ERROR_COMMON || popUpType === EPopUp.LOGIN_ERROR || popUpType === EPopUp.ERROR_DETAIL) {
      history.push('');
    }

    if (popUpType === EPopUp.CONTACT_FORM) {
      reset();
    }

    CorePageStore.updatePopupAction(undefined);
  };

  const profileLogin = CoreAuthenticationStore.profileLoginSelector();

  const postDetail = CorePostStore.detailPostSelector();

  const loadingContact = CoreUserStore.loadingContactSelector();

  const allSessionsCount = postDetail?.votes.length || 0;
  const [currentPage, setCurrentPage] = useState(1);

  const lastSessionNumber = currentPage * sessionsPerPage;
  const firstSessionIndex = lastSessionNumber - sessionsPerPage;
  const limitedSessions = (postDetail?.votes || []).slice(firstSessionIndex, lastSessionNumber);

  useEffect(() => {
    if (popUpType === EPopUp.LOGIN_SUCCESS) {
      setTimeout(() => CorePageStore.updatePopupAction(undefined), 3000);
    }
  }, [popUpType]);

  return (
    <div className={prefixClassName}>
      <Modal show={!!popUpType} onHide={handleClose}>
        {popUpType === EPopUp.LOGIN_JOURNEY1 && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <img className="me-2" src={loginIcon} alt="Login" width="15%" />
                <h4>{t('login.title')}</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="mb-3 text-dark">
                <i className="mb-3 text-dark">{t('end-contest.note')}</i>
              </p>
              {/* <p className="mx-2 mb-4">{t('login-jn1.note')}</p>
              {!window.navigator.userAgent.includes('FBAN') && (
                <NavLink
                  className="px-2 mb-3"
                  target="_top"
                  href="https://oauth.zaloapp.com/v4/permission?app_id=515363946425148194&redirect_uri=https%3A%2F%2Ftet-your-way.traveloka.link&state=zalo_jn1"
                >
                  <Button style={{ background: '#0063F2', width: '100%' }}>
                    <img src={zalo} width="9%" alt="Zalo" className="me-2" />
                    {t('login-jn1.zalo')}
                  </Button>
                </NavLink>
              )}
              {!window.navigator.userAgent.includes('Zalo') && (
                <NavLink
                  className="px-2 mb-2"
                  target="_top"
                  href="https://www.facebook.com/v15.0/dialog/oauth?client_id=825675018762597&redirect_uri=https://tet-your-way.traveloka.link&scope=email,public_profile&state=facebook_jn1"
                >
                  <Button style={{ background: '#4267B2', width: '100%' }}>
                    <img src={facebookCircle} width="9%" alt="Facebook" className="me-2" />
                    {t('login-jn1.facebook')}
                  </Button>
                </NavLink>
              )} */}
            </Modal.Body>
          </>
        )}

        {popUpType === EPopUp.LOGIN_EMPTY && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <img className="me-2" src={loginIcon} alt="Login" width="15%" />
                <h4>{t('login.title')}</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="mb-3 text-dark">
                <i className="mb-3 text-dark">{t('end-contest.note')}</i>
              </p>
              {/* <p className="mx-2 mb-4">{t('login-empty.note')}</p>
              {!window.navigator.userAgent.includes('FBAN') && (
                <NavLink
                  className="px-2 mb-3"
                  target="_top"
                  href="https://oauth.zaloapp.com/v4/permission?app_id=515363946425148194&redirect_uri=https%3A%2F%2Ftet-your-way.traveloka.link&state=zalo-empty"
                >
                  <Button style={{ background: '#0063F2', width: '100%' }}>
                    <img src={zalo} width="9%" alt="Zalo" className="me-2" />
                    {t('login-jn1.zalo')}
                  </Button>
                </NavLink>
              )}
              {!window.navigator.userAgent.includes('Zalo') && (
                <NavLink
                  className="px-2 mb-2"
                  target="_top"
                  href="https://www.facebook.com/v15.0/dialog/oauth?client_id=825675018762597&redirect_uri=https://tet-your-way.traveloka.link&scope=email,public_profile&state=facebook-empty"
                >
                  <Button style={{ background: '#4267B2', width: '100%' }}>
                    <img src={facebookCircle} width="9%" alt="Facebook" className="me-2" />
                    {t('login-jn1.facebook')}
                  </Button>
                </NavLink>
              )} */}
            </Modal.Body>
          </>
        )}

        {popUpType === EPopUp.LOGIN_SUCCESS && (
          <>
            <Modal.Header closeButton className={`${prefixClassName}__header-login`}>
              <Modal.Title>
                <img className="me-2" src={loginSuccessIcon} alt="Login" width="15%" />
                <h4 style={{ fontSize: '1.25rem' }}>{t('login.success-title')}</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="mx-2">{t('login-jn1.success-note', { 0: profileLogin?.name || 'bạn' })}</p>
              {profileLogin && (
                <Card.Title className="mx-2">
                  <Avatar src={profileLogin?.avatar} alt={profileLogin.name} round size="40" />

                  <h4 className="text-secondary">{profileLogin?.name}</h4>
                </Card.Title>
              )}
              <Button variant="primary" type="submit" className="mt-2 w-100 text-light" onClick={() => handleClose()}>
                {t('login-jn1.success-continue')}
              </Button>
            </Modal.Body>
          </>
        )}

        {popUpType === EPopUp.LOGIN_ERROR && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <img className="pt-4 pb-2" src={error} alt="contact" width="100%" />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-danger">{t('login.error')}</p>
              <Button variant="danger" type="submit" className="w-100 text-light" onClick={() => handleClose()}>
                {t('login.error-close-button')}
              </Button>
            </Modal.Body>
          </>
        )}

        {popUpType === EPopUp.LOGIN_JOURNEY2 && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <img className="me-2" src={loginIcon} alt="Login" width="15%" />
                <h4>{t('login.title')}</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="mb-3 text-dark">
                <i className="mb-3 text-dark">{t('end-contest.note')}</i>
              </p>
              {/* <p className="mx-2">{t('login-jn2.note')}</p>
              {!window.navigator.userAgent.includes('FBAN') && (
                <NavLink
                  className="px-2 mb-2"
                  target="_top"
                  href={`https://oauth.zaloapp.com/v4/permission?app_id=515363946425148194&redirect_uri=https%3A%2F%2Ftet-your-way.traveloka.link&state=zalo_jn2-${postDetail?.postId}`}
                >
                  <Button style={{ background: '#0063F2', width: '100%' }}>
                    <img src={zalo} width="9%" alt="Zalo" className="me-2" />
                    {t('login-jn1.zalo')}
                  </Button>
                </NavLink>
              )}
              {!window.navigator.userAgent.includes('Zalo') && (
                <NavLink
                  className="px-2 mb-2"
                  target="_top"
                  href={`https://www.facebook.com/v15.0/dialog/oauth?client_id=825675018762597&redirect_uri=https://tet-your-way.traveloka.link&scope=email,public_profile&state=facebook_jn2-${postDetail?.postId}`}
                >
                  <Button style={{ background: '#4267B2', width: '100%' }}>
                    <img src={facebookCircle} width="9%" alt="Facebook" className="me-2" />
                    {t('login-jn1.facebook')}
                  </Button>
                </NavLink>
              )} */}
            </Modal.Body>
          </>
        )}

        {popUpType === EPopUp.DETAIL_VOTES && (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="mt-3">
                <img src={totalVote} alt="Total Vote" width="12%" />
                <h4 className="ms-2">{t('detail-vote.title')}</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ minHeight: '325px' }}>
              <p className="mx-2 my-1">{t('detail-vote.total', { 0: postDetail?.votes.length || 0 })}</p>
              <ListGroup variant="flush">
                {limitedSessions.map((vote, index) => (
                  <ListGroup.Item key={index} className="px-0 mx-2">
                    <div className={`${prefixClassName}__profile-vote`}>
                      <Avatar src={vote.avatar} alt={postDetail?.name} round size="35" />
                      <h6 className="text-secondary">{vote.name}</h6>
                    </div>
                    <div className={`${prefixClassName}__time-vote`}>
                      <p>{convertFormatDate(vote.voteDate || '').formattedDate}</p>
                      <p>{convertFormatDate(vote.voteDate || '').hourMinute}</p>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Modal.Body>
            <Modal.Footer>
              <PaginationComponent
                itemsCount={allSessionsCount}
                itemsPerPage={sessionsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                alwaysShown
              />
            </Modal.Footer>
          </>
        )}

        {popUpType === EPopUp.ERROR_UPLOAD && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <img className="pt-4 pb-2" src={error} alt="Upload Fail" width="100%" />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-dark">{t('error-upload.note')}</p>
              <p
                style={{ textDecoration: 'underline', fontWeight: '600', color: 'var(--primary)' }}
                onClick={() => CorePageStore.updatePopupAction(EPopUp.CONTACT_FORM)}
              >
                {t('error-upload.contact')}
              </p>
              <Button variant="danger" type="submit" className="w-100 text-light" onClick={() => handleClose()}>
                {t('error-upload.close-button')}
              </Button>
            </Modal.Body>
          </>
        )}

        {popUpType === EPopUp.CONTACT_FORM && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <img className="pt-4" src={contact} alt="Contact" width="50%" />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {loadingContact && <Loading />}
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder={t('contact.place-holder.name')}
                    {...(register('name') as any)}
                  />
                  {errors.name && <FormLabel className="text-danger mt-1 mb-0">{errors.name?.message}</FormLabel>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="text"
                    placeholder={t('contact.place-holder.phone')}
                    {...(register('phoneNumber') as any)}
                  />
                  {errors.phoneNumber && (
                    <FormLabel className="text-danger mt-1 mb-0">{errors.phoneNumber?.message}</FormLabel>
                  )}
                </Form.Group>

                <FloatingLabel controlId="floatingTextarea2" label={t('contact.place-holder.message')}>
                  <Form.Control
                    as="textarea"
                    placeholder={t('contact.place-holder.message')}
                    style={{ height: '120px', color: '#212529' }}
                    {...(register('message') as any)}
                  />
                </FloatingLabel>
                {errors.message && <FormLabel className="text-danger mt-1 mb-0">{errors.message?.message}</FormLabel>}

                <Form.Text>{t('contact-form.warning')}</Form.Text>

                <Button variant="primary" type="submit" className="mt-4 w-100">
                  {t('contact-form.send-button')}
                </Button>
              </Form>
            </Modal.Body>
          </>
        )}

        {popUpType === EPopUp.SUCCESS_CONTACT && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <img className="pt-4" src={contact} alt="Login" width="50%" />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-dark">{t('contact-form.thank-you')}</Modal.Body>
          </>
        )}

        {popUpType === EPopUp.ERROR_CONTACT && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <img className="pt-4 pb-2" src={error} alt="contact" width="100%" />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-danger">{t('common.error-note')}</p>
              <Button variant="danger" type="submit" className="w-100 text-light" onClick={() => handleClose()}>
                {t('common.error-close-button')}
              </Button>
            </Modal.Body>
          </>
        )}

        {popUpType === EPopUp.ERROR_COMMON && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <img className="pt-4 pb-2" src={error} alt="contact" width="100%" />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-danger">{t('common.error-note')}</p>
              <Button variant="danger" type="submit" className="w-100 text-light" onClick={() => handleClose()}>
                {t('common.error-close-button')}
              </Button>
            </Modal.Body>
          </>
        )}

        {popUpType === EPopUp.ERROR_DETAIL && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <img className="pt-4 pb-2" src={error} alt="contact" width="100%" />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-danger">{t('detail.error-note')}</p>
              <Button variant="danger" type="submit" className="w-100 text-light" onClick={() => handleClose()}>
                {t('common.error-close-button')}
              </Button>
            </Modal.Body>
          </>
        )}

        {popUpType === EPopUp.WARNING_POST && (
          <>
            <Modal.Header closeButton>
              <Modal.Title
                className="mt-2"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  background: 'none',
                  WebkitTextFillColor: 'black',
                }}
              >
                <img className="mt-1 me-2" src={warningIcon} alt="warning-post" width="6%" />
                <h3 className="text-dark">{t('warning-post.title')}</h3>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="text-dark">{t('warning-post.note')}</p>
              <Button variant="warning" type="submit" className="w-100 text-dark mb-2" onClick={() => handleClose()}>
                {t('warning-post.force-upload-button-close')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="w-100 text-light"
                onClick={() => {
                  if (forcePost) {
                    forcePost();
                  }
                  handleClose();
                }}
              >
                {t('warning-post.force-upload-button')}
              </Button>
            </Modal.Body>
          </>
        )}
      </Modal>
    </div>
  );
});
