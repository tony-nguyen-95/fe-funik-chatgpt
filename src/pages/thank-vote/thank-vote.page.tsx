import { observer } from 'mobx-react';
import React, { useEffect, useMemo, useRef } from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { LazyLoadImage, Loading } from '../../components';
import { DOMAIN_CDN, DOMAIN_FE } from '../../config';
import { CoreUserStore, CoreVoteStore } from '../../stores';
import './thank-vote.style.scss';
import { IThankVoteProps } from './thank-vote.type';
// import thankMelon from '../../assets/thankMelon.png';
import shareZaloWhite from '../../assets/shareZaloWhite.png';
import shareFacebookWhite from '../../assets/shareFacebookWhite.png';
import { Footer, NavBar, PostList, Prizes, SocialShare } from '../../views';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from '../../hooks';

const prefixClassName = 'thank-vote';

export const ThankVote: React.FC<IThankVoteProps> = observer((props) => {
  const divRef = useRef<HTMLDivElement>(null);

  const history = useHistory();

  const { t } = useTranslation();

  const { width } = useWindowDimensions();

  const loadingSignInAndVote = CoreVoteStore.loadingSignAndVoteSelector();

  const errorLoginAndVote = CoreVoteStore.errorSignAndVoteSelector();

  const errorImageVote = CoreVoteStore.errorImageVoteSelector();

  const postVoted = CoreVoteStore.postVotedSelector();

  const userProfile = CoreUserStore.userProfileSelector();

  const idPostAlreadyVoted: string | undefined = useMemo(() => {
    if (!errorLoginAndVote || postVoted) return undefined;
    return errorLoginAndVote.split(' ')[errorLoginAndVote.split(' ').length - 3];
  }, [errorLoginAndVote, postVoted]);

  useEffect(() => {
    const parsedHTML = document
      .createRange()
      .createContextualFragment(
        `<div class="zalo-share-button" data-href="https://traveloka.link/c/${
          errorLoginAndVote ? idPostAlreadyVoted : postVoted?.id
        }" data-oaid="4498034832828454541" data-layout="1" data-color="blue" data-share-type="3" data-customize="true"></div><script src="https://sp.zalo.me/plugins/sdk.js"></script>`,
      );
    divRef.current?.appendChild(parsedHTML);
  }, [errorLoginAndVote, idPostAlreadyVoted, postVoted]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!userProfile) {
      CoreUserStore.fetchUserProfileAction();
    }
  }, [userProfile]);

  return (
    <>
      {width >= 992 && <NavBar isWhite />}

      <div className={prefixClassName}>
        {loadingSignInAndVote && <Loading />}

        {(postVoted || errorLoginAndVote) && (
          <>
            <div className={`${prefixClassName}__review-title`}>
              <h1 style={{ textAlign: 'center', fontWeight: 800, marginTop: '2rem' }}>
                {errorLoginAndVote ? 'Sorry !' : `Thank you !`}
              </h1>
            </div>
            <Card style={{ width: '100%', border: 'none', background: 'var(--primary)' }}>
              <Card.Text className="text-center my-2" style={{ fontWeight: '800' }}>
                {errorLoginAndVote ? t('thank-vote.sorry-voted') : t('thank-vote.thank-vote')}
              </Card.Text>
              <LazyLoadImage
                width="100%"
                src={postVoted ? `${DOMAIN_CDN}${postVoted?.imagePost}` : `${DOMAIN_CDN}${errorImageVote}`}
                alt="Thank you"
                style={{ borderRadius: '4px', border: '2px solid #D6F1FF' }}
              />
            </Card>

            <InputGroup className="my-3" style={{ borderRadius: '8px', border: '4px solid #E7F1FF' }}>
              <Form.Control
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                defaultValue={
                  errorLoginAndVote
                    ? `https://traveloka.link/c/${idPostAlreadyVoted}`
                    : `https://traveloka.link/c/${postVoted?.id}`
                }
                style={{ borderColor: 'var(--primary)' }}
              />
              <Button
                variant="outline-secondary"
                id="button-addon"
                style={{ width: '40%', borderColor: 'var(--primary)', color: 'var(--primary)', background: 'white' }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    errorLoginAndVote
                      ? `https://traveloka.link/c/${idPostAlreadyVoted}`
                      : `https://traveloka.link/c/${postVoted?.id}`,
                  );

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
                <img src={shareZaloWhite} alt="zalo" width="100%" />
              </div>

              <div
                className="fb-share-button"
                data-href="https://tet-your-way.traveloka.link/"
                data-layout="button_count"
                data-size="small"
              >
                <a
                  target="_blank"
                  href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fhttps://traveloka.link/c/${
                    errorLoginAndVote ? idPostAlreadyVoted : postVoted?.id
                  }&src=sdkpreparse`}
                  className="fb-xfbml-parse-ignore"
                  rel="noreferrer"
                >
                  <img src={shareFacebookWhite} alt="facebook" width="100%" />
                </a>
              </div>
            </div>

            <div className="d-flex justify-content-center mb-2">
              <a
                style={{ fontWeight: '800', color: 'white', marginBottom: '1rem' }}
                href={`${DOMAIN_FE}?detail=${postVoted?.id || idPostAlreadyVoted}`}
              >
                {t('thank-vote.view-post')}
              </a>
            </div>

            <div className="d-flex justify-content-center mb-4">
              <p
                onClick={() => history.push('')}
                style={{ fontWeight: '800', color: 'white', marginBottom: '1rem', textDecoration: 'underline' }}
              >
                {t('thank-vote.go-back-home')}
              </p>
            </div>

            {/* <Card>
              <Card.Header style={{ borderBottom: 0, color: 'black' }}>
                {t('thank-vote.call-to-join')}
                <Button
                  className="w-100 mt-2 py-1"
                  style={{
                    background: 'var(--btn-primary)',
                    color: 'black',
                    border: 'none',
                    boxShadow: '4px 3px #D6F1FF',
                  }}
                  onClick={() => {
                    return history.push('?screen=form-contest');
                  }}
                >
                  {t('common.join-contest')}
                </Button>
              </Card.Header>
            </Card> */}
          </>
        )}

        {/* {errorLoginAndVote && (
          <div className={`${prefixClassName}__review-title`}>
            <h1>Sorry!</h1>
            <p>{errorLoginAndVote.replace(`${idPostAlreadyVoted} `, '')}</p>

            <Button
              className="w-100 mt-2 py-1"
              variant="primary"
              onClick={() => history.push(`?detail=${idPostAlreadyVoted}`)}
            >
              Comeback the post
            </Button>
          </div>
        )} */}
      </div>

      <Prizes hasDecorator={false} colorButton="white" buttonColor="var(--primary)" background="#E7F1FF" />

      <PostList isWhite />

      <SocialShare isWhiteDecorator />

      <Footer />
    </>
  );
});
