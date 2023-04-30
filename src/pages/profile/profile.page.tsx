import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import Avatar from 'react-avatar';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { DOMAIN_CDN } from '../../config';
import { CoreAuthenticationStore, CorePageStore, CoreUserStore } from '../../stores';
import { Footer, NavBar, Prizes, SocialShare } from '../../views';
import './profile.style.scss';
import { IProfileProps } from './profile.type';
import shareZalo from '../../assets/shareZalo.png';
import shareFacebook from '../../assets/shareFacebook.png';
import { useHistory } from 'react-router-dom';
import { Loading, PaginationComponent } from '../../components';
// import joinContest from '../../assets/joinContest.png';
// import { EPopUp } from '../../stores/store-page/store';
import { useTranslation } from 'react-i18next';
import { PostStatus } from '../../models';
import { EPopUp } from '../../stores/store-page/store';

const prefixClassName = 'profile';

const sessionsPerPage = 8;

export const Profile: React.FC<IProfileProps> = observer((props) => {
  const history = useHistory();

  const { t } = useTranslation();

  const isLogin = CoreAuthenticationStore.isLoginSelector();

  const profileShare = CoreUserStore.profileShareLInkSelector();

  const loadingProfile = CoreUserStore.loadingProfileSelector();

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profileShare?.id) return;
    const parsedHTML = document
      .createRange()
      .createContextualFragment(
        `<div class="zalo-share-button" data-href="https://traveloka.link/d/${profileShare?.id}" data-oaid="4498034832828454541" data-layout="1" data-color="blue" data-share-type="3" data-customize="true"></div><script src="https://sp.zalo.me/plugins/sdk.js"></script>`,
      );
    divRef.current?.appendChild(parsedHTML);
  }, [profileShare?.id]);

  const allSessionsCount = profileShare?.posts?.length || 0;
  const [currentPage, setCurrentPage] = useState(1);

  const lastSessionNumber = currentPage * sessionsPerPage;
  const firstSessionIndex = lastSessionNumber - sessionsPerPage;
  const limitedSessions = (profileShare?.posts || [])
    .filter((post) => post.postStatus !== PostStatus.UNPUBLISHED)
    .slice(firstSessionIndex, lastSessionNumber);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (profileShare?.posts) {
      setCurrentPage(1);
    }
  }, [profileShare?.posts]);

  return (
    <>
      <NavBar isWhite />
      <div className={prefixClassName}>
        {loadingProfile && <Loading />}

        <div className={`${prefixClassName}__header`}>
          <Avatar
            src={profileShare?.avatar}
            alt={profileShare?.name}
            size="100"
            round
            style={{ boxShadow: '4px 4px #D6F1FF' }}
          />

          <h1 style={{ color: 'var(--primary)', fontWeight: 800, marginTop: '1rem' }}>{profileShare?.name}</h1>

          {profileShare && (
            <InputGroup className="my-3" style={{ borderRadius: '8px', border: '4px solid #E7F1FF' }}>
              <Form.Control
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                defaultValue={`https://traveloka.link/d/${profileShare?.id}`}
                style={{ borderColor: 'var(--primary)' }}
              />
              <Button
                variant="outline-secondary"
                id="button-addon"
                style={{ width: '38%', borderColor: 'var(--primary)', color: 'var(--primary)' }}
                onClick={() => {
                  navigator.clipboard.writeText(`https://traveloka.link/d/${profileShare?.id}` || '');

                  withReactContent(Swal).fire({
                    position: 'center',
                    title: '<h5 style="font-size: 20px; color: black">Copied Clipboard</h5>',
                    width: 200,
                    color: 'black',
                    showConfirmButton: false,
                    timer: 800,
                  });
                }}
              >
                <i className="fa-solid fa-copy" style={{ color: 'var(--primary)', marginRight: '0.5rem' }} />
                Copy Link
              </Button>
            </InputGroup>
          )}

          <div className={`${prefixClassName}__review-button-group`}>
            <div className={`${prefixClassName}__review-button-zalo`} ref={divRef}>
              <img src={shareZalo} alt="zalo" width="100%" />
            </div>

            <div
              className="fb-share-button"
              data-href="https://tet-your-way.traveloka.link/"
              data-layout="button_count"
              data-size="small"
            >
              <a
                // target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftraveloka.link/d/${profileShare?.id}&src=sdkpreparse`}
                className="fb-xfbml-parse-ignore"
                rel="noreferrer"
              >
                <img src={shareFacebook} alt="facebook" width="100%" />
              </a>
            </div>
          </div>
        </div>

        {profileShare?.posts?.length && (
          <>
            {/* <div className={`${prefixClassName}__header-list`}>
              <h1>{t('post.title')}</h1>
            </div> */}
            <div className={`${prefixClassName}__post-list-wrapper`}>
              {limitedSessions.map((otherPost) => {
                if (!otherPost) return null;

                return (
                  <Card
                    key={otherPost.id}
                    onClick={() => {
                      history.push(`?detail=${otherPost.id}`);
                    }}
                  >
                    <div className={`${prefixClassName}__card-image`}>
                      <Card.Img variant="top" src={`${DOMAIN_CDN}${otherPost.imagePost}`} />
                      <div className={`${prefixClassName}__image-post-votes`}>
                        <i className="fa-solid fa-heart" />
                        <p>
                          {otherPost.receivedVotes.length} {t('post.votes')}
                        </p>
                      </div>
                    </div>
                    <Card.Body>
                      <Card.Text>{otherPost.contentPost}</Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </>
        )}
        <PaginationComponent
          itemsCount={allSessionsCount}
          itemsPerPage={sessionsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          alwaysShown
        />

        {/* <div
          className="mt-1"
          onClick={() => {
            if (isLogin) {
              return history.push('?screen=form-contest');
            }

            return CorePageStore.updatePopupAction(EPopUp.LOGIN_JOURNEY1);
          }}
        >
          <img src={joinContest} width="100%" alt="join-contest" />
        </div> */}
      </div>
      <div className={`${prefixClassName}__rule`}>
        <h1>{t('rule.title')}</h1>
        <p style={{ color: 'black' }}>{t('common.read-more-form')}</p>
        <div className={`${prefixClassName}__rule-more`} onClick={() => history.push('?screen=rule')}>
          <p>{t('common.read-more')}</p>
          <i className="fa-solid fa-play" />
        </div>
        <Button
          variant="primary"
          className="text-light w-100"
          onClick={() => {
            if (isLogin) {
              return history.push('?screen=form-contest');
            }

            return CorePageStore.updatePopupAction(EPopUp.LOGIN_JOURNEY1);
          }}
        >
          {t('common.join-contest')}
        </Button>
      </div>

      <Prizes />

      <SocialShare isWhiteDecorator />

      <Footer />
    </>
  );
});
