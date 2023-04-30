import { observer } from 'mobx-react';
import React, { useEffect, useMemo, useState } from 'react';
import Avatar from 'react-avatar';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Loading, PaginationComponent } from '../../components';
import { DOMAIN_CDN } from '../../config';
import { IPostListResponse } from '../../models';
import { CoreAuthenticationStore, CorePageStore, CorePostStore } from '../../stores';
import { EPopUp } from '../../stores/store-page/store';
import { Footer, NavBar } from '../../views';
import './list-post.style.scss';
import { IListPostProps } from './list-post.type';

const prefixClassName = 'list-post';

const sessionsPerPage = 8;

export const ListPost: React.FC<IListPostProps> = observer((props) => {
  const history = useHistory();

  const { t } = useTranslation();

  const isLogin = CoreAuthenticationStore.isLoginSelector();

  const [searchKeyWords, setSearchKeyWords] = useState<string>();

  const [currentPage, setCurrentPage] = useState(1);

  const postsRankVote = CorePostStore.allPostRankVoteSelector();

  const loadingPosts = CorePostStore.loadingAllPostSelector();

  const sortType = CorePostStore.sortTypeSelector();

  const sortedItems: IPostListResponse[] = useMemo(() => {
    if (!postsRankVote) return [];
    const _postsRankVote = [...postsRankVote];

    const resultList: IPostListResponse[] = [];

    if (sortType === 'VOTES') {
      _postsRankVote.forEach((post) => {
        const { name, contentPost } = post;
        const displayTitle = name ?? (contentPost || '');

        if (
          searchKeyWords &&
          !displayTitle.toLocaleLowerCase().replace(/\s+/, '').includes(searchKeyWords.toLowerCase().replace(/\s+/, ''))
        )
          return;

        return resultList.push(post);
      });
    }

    if (sortType === 'NEWEST') {
      _postsRankVote
        .sort((pre, nex) => {
          if (new Date(pre.createDate) > new Date(nex.createDate)) {
            return -1;
          }
          return 1;
        })
        .forEach((post) => {
          const { name, contentPost } = post;
          const displayTitle = name ?? (contentPost || '');

          if (
            searchKeyWords &&
            !displayTitle
              .toLocaleLowerCase()
              .replace(/\s+/, '')
              .includes(searchKeyWords.toLowerCase().replace(/\s+/, ''))
          )
            return;

          return resultList.push(post);
        });
    }

    return resultList;
  }, [postsRankVote, searchKeyWords, sortType]);

  const allSessionsCount = sortedItems?.length || 0;

  const lastSessionNumber: number = useMemo(() => currentPage * sessionsPerPage, [currentPage]);

  const firstSessionIndex: number = useMemo(() => lastSessionNumber - sessionsPerPage, [lastSessionNumber]);

  const limitedSessions = useMemo(
    () => sortedItems.slice(firstSessionIndex, lastSessionNumber),
    [sortedItems, firstSessionIndex, lastSessionNumber],
  );

  useEffect(() => {
    if (sortedItems) {
      setCurrentPage(1);
    }
  }, [sortedItems]);

  useEffect(() => {
    if (!postsRankVote) {
      CorePostStore.fetchAllPostAction();
    }
  }, [postsRankVote]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavBar isWhite />
      <div className={prefixClassName}>
        <div className={`${prefixClassName}__header-group`}>
          <InputGroup className={`${prefixClassName}__search`}>
            <Form.Control
              placeholder={t('list-post.search-author-placeholder') || 'Search authors, ...'}
              value={searchKeyWords || ''}
              onChange={(event) => setSearchKeyWords(event.target.value)}
            />
            <Button
              variant="primary"
              id="button-addon2"
              onClick={() => {
                if (searchKeyWords) {
                  setSearchKeyWords(undefined);
                }
              }}
              disabled={!searchKeyWords}
            >
              {searchKeyWords ? (
                <i className="fa-solid fa-xmark" style={{ fontSize: '1.5rem' }} />
              ) : (
                <i className="fa-solid fa-magnifying-glass" />
              )}
            </Button>
          </InputGroup>
          {loadingPosts && <Loading />}
          {postsRankVote && (
            <>
              <div className={`${prefixClassName}__header-list`}>
                <h1>{t('post.title')}</h1>
                <Form.Select
                  defaultValue={sortType}
                  onChange={(e: any) => {
                    e.preventDefault();
                    return CorePostStore.updateSortTypeAction(e.target.value);
                  }}
                >
                  <option value="VOTES">{t('post.most-voted')}</option>
                  <option value="NEWEST">{t('post.newest')}</option>
                </Form.Select>
              </div>
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
                            {otherPost.numberOfVotes} {t('post.votes')}
                          </p>
                        </div>
                      </div>
                      <Card.Body>
                        <Card.Title>
                          <Avatar src={otherPost.avatar} alt="" round size="32" />
                          <h6>{otherPost.name.length < 20 ? otherPost.name : `${otherPost.name.slice(0, 16)} ...`}</h6>
                        </Card.Title>
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
        </div>
      </div>
      <div className={`${prefixClassName}__rule`}>
        <h1>{t('rule.title')}</h1>
        <p style={{ color: 'black' }}>{t('rule.short')}</p>
        <div className={`${prefixClassName}__rule-more`} onClick={() => history.push('?screen=rule')}>
          <p>{t('common.read-more')}</p>
          <i className="fa-solid fa-play" />
        </div>
        {!isLogin ? (
          <Button onClick={() => CorePageStore.updatePopupAction(EPopUp.LOGIN_JOURNEY1)}>
            {t('common.join-contest')}
          </Button>
        ) : (
          <Button onClick={() => history.push('?screen=form-contest')}>{t('common.add-more-post')}</Button>
        )}
      </div>
      <Footer />
    </>
  );
});
