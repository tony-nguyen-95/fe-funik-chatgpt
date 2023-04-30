import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Avatar from 'react-avatar';
import { Button, Card, InputGroup, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { LazyLoadImage, Loading, PopupModal } from '../../components';
import { DOMAIN_CDN, DOMAIN_FE } from '../../config';
import { CoreAuthenticationStore, CorePageStore, CorePostStore, CoreUserStore, CoreVoteStore } from '../../stores';
import { EPopUp } from '../../stores/store-page/store';
import { convertFormatDate } from '../../utils';
import { Footer, NavBar, Prizes } from '../../views';
import './detail.style.scss';
import { IDetailProps } from './detail.type';
// import shareZalo from '../../assets/shareZalo.png';
// import shareFacebook from '../../assets/shareFacebook.png';
import { useTranslation } from 'react-i18next';
import zalo from '../../assets/zalo.png';
import facebook from '../../assets/facebook.png';

const prefixClassName = 'detail';

export const Detail: React.FC<IDetailProps> = observer((props) => {
  const history = useHistory();

  const { t } = useTranslation();

  const [loadingPost, setLoadingPost] = useState(true);

  const postDetail = CorePostStore.detailPostSelector();

  const isLogin = CoreAuthenticationStore.isLoginSelector();

  const userProfile = CoreUserStore.userProfileSelector();

  const isAllowVote: boolean = useMemo(() => {
    if (!userProfile && !postDetail) return true;
    const gavePostIds: number[] = [];
    userProfile?.gaveVotes?.forEach((votes) => gavePostIds.push(votes.post.id as number));
    return !gavePostIds.includes(postDetail?.postId as number);
  }, [postDetail, userProfile]);

  const handleVote = () => {
    if (!isLogin && isAllowVote) {
      return CorePageStore.updatePopupAction(EPopUp.LOGIN_JOURNEY2);
    }

    CoreVoteStore.voteWithAuthAction(`${postDetail?.postId}` || '');

    return history.push('?screen=thank-you-vote');
  };

  useEffect(() => {
    if (postDetail) {
      setLoadingPost(false);
    }
  }, [postDetail]);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!postDetail) return;
    const parsedHTML = document
      .createRange()
      .createContextualFragment(
        `<div class="zalo-share-button" data-href="https://traveloka.link/c/${postDetail?.postId}" data-oaid="4498034832828454541" data-layout="1" data-color="blue" data-share-type="3" data-customize="true"></div><script src="https://sp.zalo.me/plugins/sdk.js"></script>`,
      );
    divRef.current?.appendChild(parsedHTML);
  }, [postDetail?.postId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar isWhite />
      <div className={prefixClassName}>
        {loadingPost && <Loading />}

        {postDetail && (
          <>
            <div className={`${prefixClassName}__title-post`}>
              <h1>{t('detail.vote-post-title')}</h1>

              <div className={`${prefixClassName}__title-right`}>
                <i className="fa-regular fa-calendar-days" />
                <p>{convertFormatDate(`${postDetail?.createDate}`).formattedDate}</p>
              </div>
            </div>

            <Card style={{ width: '100%', borderBottom: '1px dashed rgba(0, 0, 0, 0.5)' }}>
              <div className={`${prefixClassName}__image-post`}>
                <LazyLoadImage
                  width="100%"
                  src={`${DOMAIN_CDN}${postDetail?.imagePost}`}
                  alt={`${postDetail?.postId || ''}`}
                />
                <div
                  className={`${prefixClassName}__image-post-votes`}
                  onClick={() => CorePageStore.updatePopupAction(EPopUp.DETAIL_VOTES)}
                >
                  <i className="fa-solid fa-heart" />
                  <p>
                    {postDetail?.votes.length} {t('post.votes')}
                  </p>
                </div>
              </div>
              <Card.Body>
                <Card.Title>
                  <Avatar src={postDetail?.avatar} alt={postDetail?.name} round size="40" />
                  <h3 className="text-secondary">{postDetail?.name}</h3>
                </Card.Title>
                <Card.Text className="text-dark">{postDetail?.contentPost}</Card.Text>

                <Card.Text style={{ color: '#6C757D', fontSize: '14px', fontStyle: 'italic', marginTop: '1rem' }}>
                  {t('detail.call-vote', { 0: postDetail.name })}
                </Card.Text>

                {!isAllowVote ? (
                  <Button disabled variant="dark" className="w-100">
                    <i className="fa-regular fa-heart me-2" />
                    {t('detail.voted')}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    className="w-100"
                    disabled
                    //  onClick={() => handleVote()}
                  >
                    <i className="fa-regular fa-heart me-2" />
                    {t('detail.vote')}
                  </Button>
                )}
                {/* {!isAllowVote && <Card.Text className="mt-2 text-dark">{t('detail.note-voted')}</Card.Text>} */}
              </Card.Body>
            </Card>

            <InputGroup className="my-3" style={{ borderRadius: '8px', border: '4px solid #E7F1FF' }}>
              <Form.Control
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                defaultValue={`https://traveloka.link/c/${postDetail?.postId}`}
                style={{ borderColor: 'var(--primary)' }}
              />
              <Button
                variant="outline-secondary"
                id="button-addon"
                style={{ width: '40%', borderColor: 'var(--primary)', color: 'var(--primary)' }}
                onClick={() => {
                  navigator.clipboard.writeText(`https://traveloka.link/c/${postDetail?.postId}` || '');

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
                  target="_blank"
                  href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftraveloka.link/c/${postDetail?.postId}&src=sdkpreparse`}
                  className="fb-xfbml-parse-ignore"
                  rel="noreferrer"
                >
                  <img src={facebook} alt="facebook" width="12%" />
                  <p>{t('thank-you.share-facebook')}</p>
                </a>
              </div>
            </div>
            <p style={{ color: '#666', fontSize: '0.75rem' }}>{t('detail.note-comment')}</p>

            <div
              dangerouslySetInnerHTML={{
                __html: `<div class="zalo-comment-plugin" data-appid="515363946425148194" data-size="5" data-href="${DOMAIN_FE}?detail=${postDetail?.postId}"></div>`,
              }}
            />
          </>
        )}

        <PopupModal />
      </div>

      <div className={`${prefixClassName}__rule-wrapper`}>
        <div className={`${prefixClassName}__rule`}>
          <h1>{t('rule.title')}</h1>
          <p>{t('rule.short')}</p>
          <div className={`${prefixClassName}__rule-more`} onClick={() => history.push('?screen=rule')}>
            <p>{t('common.read-more')}</p>
            <i className="fa-solid fa-play" />
          </div>
          <p className="mb-3">
            <i>{t('end-contest.note')}</i>
          </p>
          {/* {!isLogin ? (
            <Button onClick={() => CorePageStore.updatePopupAction(EPopUp.LOGIN_JOURNEY1)}>
              {t('common.join-contest')}
            </Button>
          ) : (
            <Button onClick={() => history.push('?screen=form-contest')}>{t('common.add-more-post')}</Button>
          )} */}
        </div>
      </div>

      <Prizes />

      <Footer />
    </>
  );
});
