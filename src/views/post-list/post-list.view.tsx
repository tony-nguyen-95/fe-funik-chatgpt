import { observer } from 'mobx-react';
import React, { useEffect, useMemo } from 'react';
import Avatar from 'react-avatar';
import { Button, Card, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Loading } from '../../components';
import { DOMAIN_CDN } from '../../config';
import { useWindowDimensions } from '../../hooks';
import { CoreAuthenticationStore, CorePageStore, CorePostStore } from '../../stores';
import { EPopUp } from '../../stores/store-page/store';
import './post-list.style.scss';
import { IPostListProps } from './post-list.type';

const prefixClassName = 'post-list';

export const PostList: React.FC<IPostListProps> = observer((props) => {
  const { isWhite } = props;

  const { t } = useTranslation();

  const history = useHistory();

  const isLogin = CoreAuthenticationStore.isLoginSelector();

  const loadingPosts = CorePostStore.loadingAllPostSelector();

  const postsRankVote = CorePostStore.allPostRankVoteSelector();

  const sortType = CorePostStore.sortTypeSelector();

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (!postsRankVote) {
      CorePostStore.fetchAllPostAction();
    }
  }, [postsRankVote]);

  const displayItems = useMemo(() => {
    if (!postsRankVote) return [];

    const _postsRankVote = [...postsRankVote];

    if (sortType === 'VOTES') {
      if (width >= 992) {
        return _postsRankVote.splice(0, 12);
      }

      return _postsRankVote.splice(0, 8);
    }

    if (width >= 992) {
      return _postsRankVote
        .sort((pre, nex) => {
          if (new Date(pre.createDate) > new Date(nex.createDate)) {
            return -1;
          }
          return 1;
        })
        .splice(0, 12);
    }

    return _postsRankVote
      .sort((pre, nex) => {
        if (new Date(pre.createDate) > new Date(nex.createDate)) {
          return -1;
        }
        return 1;
      })
      .splice(0, 8);
  }, [postsRankVote, sortType, width]);

  return (
    <div className={prefixClassName} style={{ background: isWhite ? 'white' : 'var(--primary)' }}>
      <div className={`${prefixClassName}__other-post-list`} style={{ minHeight: '30vh' }}>
        {loadingPosts && <Loading />}
        {postsRankVote && (
          <>
            <div className={`${prefixClassName}__header-list`}>
              <h1 style={{ color: !isWhite ? 'white' : 'var(--primary)' }}>{t('post.title')}</h1>
              <Form.Select
                defaultValue={sortType}
                onChange={(e: any) => {
                  CorePostStore.updateSortTypeAction(e.target.value);
                }}
              >
                <option value="VOTES">{t('post.most-voted')}</option>
                <option value="NEWEST">{t('post.newest')}</option>
              </Form.Select>
            </div>
            <div className={`${prefixClassName}__post-list-wrapper`}>
              {displayItems &&
                displayItems.map((otherPost) => (
                  <Card
                    key={otherPost.id}
                    onClick={() => {
                      history.push(`?detail=${otherPost.id}`);
                    }}
                    style={{ background: isWhite ? 'white' : 'var(--primary)', minHeight: '301px' }}
                  >
                    <div className={`${prefixClassName}__card-image`}>
                      <Card.Img variant="top" src={`${DOMAIN_CDN}${otherPost.imagePost}`} />
                      <div className={`${prefixClassName}__image-post-votes`}>
                        <i className="fa-solid fa-heart" />
                        <p>
                          {otherPost.numberOfVotes} {t('post.votes')}
                        </p>
                      </div>
                    </div>
                    <Card.Body>
                      <Card.Title>
                        <Avatar src={otherPost.avatar} alt="" round size="32" />
                        <h6 style={{ color: !isWhite ? 'white' : 'var(--primary)' }}>
                          {otherPost.name.length < 20 ? otherPost.name : `${otherPost.name.slice(0, 16)} ...`}
                        </h6>
                      </Card.Title>
                      <Card.Text
                        style={{
                          color: !isWhite ? 'white' : 'black',
                        }}
                      >
                        {otherPost.contentPost}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
            </div>
            {isWhite ? (
              ''
            ) : (
              <>
                <div
                  className={`${prefixClassName}__rule-more justify-content-center`}
                  onClick={() => history.push('?screen=list-post')}
                >
                  <p>{t('post.view-more')}</p>
                  <i className="fa-solid fa-play" />
                </div>
                {!isLogin ? (
                  <Button onClick={() => CorePageStore.updatePopupAction(EPopUp.LOGIN_JOURNEY1)}>
                    {t('common.join-contest')}
                  </Button>
                ) : (
                  <Button onClick={() => history.push('?screen=form-contest')}>{t('common.add-more-post')}</Button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
});
