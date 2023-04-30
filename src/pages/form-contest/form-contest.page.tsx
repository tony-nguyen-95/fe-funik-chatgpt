import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, FloatingLabel, Form, InputGroup } from 'react-bootstrap';
import './form-contest.style.scss';
import { IFormContestProps } from './form-contest.type';
import { observer } from 'mobx-react';
import { CoreAuthenticationStore, CorePageStore, CorePostStore, CoreUserStore } from '../../stores';
import Avatar from 'react-avatar';
import { useHistory } from 'react-router-dom';
import { DOMAIN_FE } from '../../config';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { Loading, PopupModal } from '../../components';
import uploadEmpty from '../../assets/upload-list-image-card.png';
import { EPopUp } from '../../stores/store-page/store';
import noteIcon from '../../assets/noteIcon.png';
import logo2 from '../../assets/TVLK_Logo_Life Your Way_VN_on White_Horizontal 2.png';
import thankYou from '../../assets/thankYou.png';
import zalo from '../../assets/zalo.png';
import facebook from '../../assets/facebook.png';
import { Footer, NavBar, SocialShare } from '../../views';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from '../../hooks';

const prefixClassName = 'form-contest';

interface IFormUploadErrors {
  fileError?: string;
  contentError?: string;
}

enum EViewForm {
  FORM_POST = 'FORM_POST',
  REVIEW_POST = 'REVIEW_POST',
  THANK_YOU = 'THANK_YOU',
}

export const FormContest: React.FC<IFormContestProps> = observer((props) => {
  const history = useHistory();

  const { t } = useTranslation();

  const loadingUpload = CorePostStore.loadingUploadPostSelector();

  const postUploaded = CorePostStore.postUploadedSelector();

  const loadingLogin = CoreAuthenticationStore.loadingSigninSelector();

  const profileLogin = CoreAuthenticationStore.profileLoginSelector();

  const userProfile = CoreUserStore.userProfileSelector();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [errorFile, setErrorFile] = useState<string | undefined>();

  const [formStringValue, setFormStringValue] = useState<string | undefined>();

  const [viewForm, setViewForm] = useState<EViewForm>(EViewForm.FORM_POST);

  const [reviewPost, setReviewPost] = useState<{ localImageUrl: string; contentPost?: string } | undefined>();

  // const [isReadMore, setIsReadMore] = useState(false);

  const isLogin = CoreAuthenticationStore.isLoginSelector();

  const handleChangeFileInput = (e: any) => {
    e.preventDefault();

    if (
      !e.target.files[0].type.match('image/*') ||
      e.target.files[0].type.includes('heic') ||
      e.target.files[0].type.includes('heif')
    ) {
      setReviewPost(undefined);
      return setErrorFile(() => t('form.error-file') || '');
    }

    if (e.target.files[0].size > 10000000) {
      setReviewPost(undefined);
      return setErrorFile(() => t('form.error-file-size') || '');
    }

    setErrorFile(undefined);
    const localImageUrl = window.URL.createObjectURL(e.target.files[0] as any);
    setReviewPost({ localImageUrl });
    setSelectedFile(e.target.files[0]);
  };

  const handleReview = (content: string) => {
    if (!userProfile && !profileLogin) {
      history.push('');
    }

    if (reviewPost) {
      setReviewPost({ ...reviewPost, contentPost: content });
      setViewForm(EViewForm.REVIEW_POST);
      window.scroll(0, 0);
    }
  };

  const handleChangeInput = (e: any) => {
    const { value } = e.target;
    setFormStringValue(value);
  };

  const handleNextStep = (e: any, file: File | null, content: string | undefined) => {
    e.preventDefault();

    if (!isLogin) {
      return history.push('');
    }

    const _errorForm: IFormUploadErrors = {};

    if (!file) {
      _errorForm.fileError = "Please choose your post's image!";
    }

    if (file && file.size > 10000000) {
      _errorForm.fileError = 'Size image should not exceed 10MB!';
    }

    if (!content || content === '') {
      _errorForm.contentError = 'Please fill out your content.';
    }

    if (content && content.split(' ').filter((word) => word !== '').length < 150) {
      _errorForm.contentError =
        'Content should not be shorter than 150 words. You might not reward prizes. Do you still post this content?';
    }

    if (content && content.split(' ').filter((word) => word !== '').length > 500) {
      _errorForm.contentError =
        'Content should not be exceed 500 words. You might not reward prizes. Do you still post this content?';
    }

    if (_errorForm.contentError) {
      return CorePageStore.updatePopupAction(EPopUp.WARNING_POST);
    }

    handleReview(content || '');
  };

  const onSubmitPost = async () => {
    CorePostStore.uploadlPostAction(selectedFile, reviewPost?.contentPost || '');
  };

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (postUploaded?.id) {
      setViewForm(EViewForm.THANK_YOU);
    }
    const parsedHTML = document
      .createRange()
      .createContextualFragment(
        `<div class="zalo-share-button" data-href="https://traveloka.link/c/${postUploaded?.id}" data-oaid="4498034832828454541" data-layout="1" data-color="blue" data-share-type="3" data-customize="true"></div><script src="https://sp.zalo.me/plugins/sdk.js"></script>`,
      );
    divRef.current?.appendChild(parsedHTML);
  }, [postUploaded?.id, viewForm]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { width } = useWindowDimensions();

  return (
    <div className={prefixClassName}>
      {loadingUpload && <Loading />}

      {loadingLogin && <Loading />}

      {width >= 992 && <NavBar isWhite />}

      {viewForm === EViewForm.FORM_POST && (
        <div style={{ padding: '1rem' }} className={`${prefixClassName}__form-contest-wrapper`}>
          <p className="mb-3">
            <i>{t('end-contest.note')}</i>
          </p>
          <div className={`${prefixClassName}__title-post`}>
            <h1 style={{ color: 'var(--primary)' }}>{t('form.title')}</h1>
            <Button variant="secondary" onClick={() => history.push('')}>
              {t('form.cancel')}
            </Button>
          </div>
          <Form
            className={`${prefixClassName}__form-wrapper`}
            onSubmit={(e) => {
              handleNextStep(e, selectedFile, formStringValue);
            }}
          >
            <Form.Label>{t('form.upload-picture')}</Form.Label>
            <Form.Group controlId="formFile" className="mb-3">
              <label style={{ width: '100%' }}>
                <input type="file" hidden onChange={(e) => handleChangeFileInput(e)} />
                {!reviewPost?.localImageUrl ? (
                  <Card.Img width="100%" variant="top" src={uploadEmpty} alt="empty" />
                ) : (
                  <Card.Img width="100%" variant="top" src={reviewPost?.localImageUrl} />
                )}
              </label>
              {errorFile && <label className="text-danger">{errorFile}</label>}
            </Form.Group>

            <Form.Group>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Form.Label>{t('form.your-story')}</Form.Label>
                <Form.Label
                  className="mt-1 text-dark"
                  style={{ background: 'none', WebkitTextFillColor: 'black', fontWeight: 500 }}
                >{`${formStringValue?.split(' ').filter((word) => word !== '').length || 0}/500`}</Form.Label>
              </div>
              <FloatingLabel controlId="floatingTextarea" label={t('form.write-your-story-lable')}>
                <Form.Control
                  as="textarea"
                  placeholder={t('form.write-your-story') || ''}
                  style={{ height: '200px' }}
                  value={formStringValue}
                  onChange={(e) => handleChangeInput(e)}
                />
              </FloatingLabel>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              disabled
              // disabled={
              //   !formStringValue ||
              //   formStringValue.split(' ').filter((word) => word !== '').length < 50 ||
              //   !selectedFile
              // }
            >
              {t('form.next-step')}
            </Button>
          </Form>
          <div className={`${prefixClassName}__rule`}>
            <h1>{t('rule.title')}</h1>
            <p style={{ color: 'black' }}>{t('common.read-more-form')}</p>
            <div className={`${prefixClassName}__rule-more`} onClick={() => history.push('?screen=rule')}>
              <p>{t('common.read-more')}</p>
              <i className="fa-solid fa-play" />
            </div>
          </div>
        </div>
      )}

      {viewForm === EViewForm.REVIEW_POST && (
        <div style={{ padding: '1rem' }} className={`${prefixClassName}__form-contest-wrapper`}>
          <div className={`${prefixClassName}__review-title`}>
            <h1 style={{ color: 'var(--primary)', fontWeight: '800' }}>{t('form.review-post')}</h1>
          </div>
          <Card style={{ width: '100%', border: 'none' }}>
            <Card.Img
              style={{ borderRadius: '4px', border: '2px solid #D6F1FF' }}
              variant="top"
              src={reviewPost?.localImageUrl}
            />
            <Card.Body className="px-0" style={{ borderTop: 'none' }}>
              <Card.Title>
                <Avatar
                  src={userProfile?.avatar || profileLogin?.avatar}
                  alt={userProfile?.name || profileLogin?.name}
                  round
                  size="48"
                />
                <h3 className="text-secondary">{userProfile?.name || profileLogin?.name}</h3>
              </Card.Title>
              <Card.Text className="text-dark mb-2">{reviewPost?.contentPost}</Card.Text>
              <div className={`${prefixClassName}__review-button-group`}>
                <Button variant="light" onClick={() => setViewForm(EViewForm.FORM_POST)}>
                  {t('form.edit-again')}
                </Button>
                <Button className="text-white" variant="primary" onClick={() => onSubmitPost()}>
                  {t('form.finish')}
                </Button>
              </div>
            </Card.Body>
          </Card>
          <Card style={{ background: '#E7F1FF', border: '1px solid #9EC5FE' }}>
            <Card.Body>
              <Card.Text
                style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '0.5rem' }}
              >
                <img className="pt-1" src={noteIcon} width={width <= 992 ? '5%' : '20%'} alt="Note" />
                <span className="text-dark mb-0">{t('form.noted-comfirm')}</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}

      {viewForm === EViewForm.THANK_YOU && (
        <>
          <div style={{ padding: '1rem' }} className={`${prefixClassName}__form-contest-wrapper`}>
            <div className={`${prefixClassName}__review-title`} style={{ alignItems: 'center' }}>
              <img src={logo2} alt="Traveloka" />
              <img src={thankYou} alt="Thank you" />
              <h6 className="text-secondary text-center" style={{ fontSize: '16px', fontWeight: '600' }}>
                {t('form.thank-you-upload')}
              </h6>
            </div>
            <Card style={{ width: '100%', border: '2px solid #D6F1FF', marginTop: '1rem' }}>
              <Card.Img
                style={{ borderRadius: '2px', borderBottom: '2px solid #D6F1FF' }}
                variant="top"
                src={reviewPost?.localImageUrl}
                alt={reviewPost?.contentPost}
              />
              <Card.Title className="p-3 mb-0">
                <Avatar
                  src={userProfile?.avatar || profileLogin?.avatar}
                  alt={userProfile?.name || profileLogin?.name}
                  round
                  size="40"
                  style={{ border: '1px solid #DEE2E6' }}
                />
                <h3 style={{ color: 'var(--primary)' }}>{userProfile?.name || profileLogin?.name}</h3>
              </Card.Title>
              {reviewPost?.contentPost && (
                <Card.Text className="text-dark px-3 pb-3">{`${reviewPost?.contentPost?.slice(0, 100)} ...`}</Card.Text>
              )}
            </Card>

            <p style={{ color: '#6C757D', fontSize: '14px', fontStyle: 'italic', marginTop: '1rem' }}>
              {t('thank-you.call-to-share')}
            </p>

            <InputGroup className="my-3" style={{ borderRadius: '8px', border: '4px solid #E7F1FF' }}>
              <Form.Control
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                defaultValue={`https://traveloka.link/c/${postUploaded?.id}`}
                style={{ borderColor: 'var(--primary)' }}
              />
              <Button
                variant="outline-secondary"
                id="button-addon"
                style={{ width: '40%', borderColor: 'var(--primary)', color: 'var(--primary)' }}
                onClick={() => {
                  navigator.clipboard.writeText(`https://traveloka.link/c/${postUploaded?.id}` || '');

                  withReactContent(Swal).fire({
                    position: 'center',
                    title: '<h5 style="font-size: 20px; color: black">Copied Clipboard</h5>',
                    width: 200,
                    color: 'var(--secondary)',
                    showConfirmButton: false,
                    timer: 800,
                  });
                }}
              >
                <i className="fa-solid fa-copy" style={{ color: 'var(--primary)', marginRight: '0.5rem' }} />
                Copy Link
              </Button>
            </InputGroup>

            <div className={`${prefixClassName}__review-button-group`}>
              <div className={`${prefixClassName}__review-button-zalo`} ref={divRef}>
                <img src={zalo} alt="zalo" width="14%" />
                <p>{t('thank-you.share-zalo')}</p>
              </div>

              <div
                className="fb-share-button"
                data-href="https://tet-your-way.traveloka.link/"
                data-layout="button_count"
                data-size="small"
              >
                <a
                  // target="_blank"
                  href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftraveloka.link/c/${postUploaded?.id}&src=sdkpreparse`}
                  className="fb-xfbml-parse-ignore"
                  rel="noreferrer"
                >
                  <img src={facebook} alt="facebook" width="12%" />
                  <p>{t('thank-you.share-facebook')}</p>
                </a>
              </div>
            </div>

            <div className="d-flex justify-content-center mb-2">
              <a style={{ fontWeight: '800' }} href={`${DOMAIN_FE}?detail=${postUploaded?.id}`}>
                {t('form.view-post')}
              </a>
            </div>

            <div className="d-flex justify-content-center mb-4">
              <p
                onClick={() => history.push('')}
                style={{
                  fontWeight: '800',
                  color: 'var(--primary)',
                  marginBottom: '1rem',
                  textDecoration: 'underline',
                }}
              >
                {t('thank-vote.go-back-home')}
              </p>
            </div>
          </div>
          <SocialShare isWhiteDecorator={width < 992} />
        </>
      )}

      {width >= 992 && <Footer />}

      <PopupModal
        forcePost={() => {
          handleReview(formStringValue || '');
        }}
      />
    </div>
  );
});
