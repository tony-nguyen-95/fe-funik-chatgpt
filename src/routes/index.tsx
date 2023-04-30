import React, { useEffect } from 'react';
import { IMainRouteProps } from './index.type';
import { observer } from 'mobx-react';
import { CoreAuthenticationStore, CorePageStore, CorePostStore, CoreUserStore, CoreVoteStore } from '../stores';
import { useHistory, useLocation } from 'react-router-dom';
import { Detail, FormContest, Home, ThankVote, Rule, ListPost, Profile, PrizePage } from '../pages';
import { useTranslation, withTranslation } from 'react-i18next';

const prefixClassName = 'home-page';

const MainRoute: React.FC<IMainRouteProps> = observer((props) => {
  const pages = CorePageStore.pageSelector();

  const { search } = useLocation();

  const history = useHistory();

  const query = new URLSearchParams(search);

  const codeQuery = query.get('code');

  const stateQuery = query.get('state');

  const detailQuery = query.get('detail');

  const profileQuery = query.get('profile');

  const screenQuery = query.get('screen');

  // const languageQuery = query.get('lang');

  // const allQuery = useMemo(() => location.search, [location]);

  const lang = CorePageStore.languageSelector();

  useEffect(() => {
    if (codeQuery && stateQuery === 'zalo_jn1') {
      CoreAuthenticationStore.signinZaloAction(codeQuery);
      history.push('?screen=form-contest');
    }
  }, [codeQuery, history, stateQuery]);

  useEffect(() => {
    if (codeQuery && stateQuery === 'facebook_jn1') {
      CoreAuthenticationStore.signinFacebookAction(codeQuery);
      history.push('?screen=form-contest');
    }
  }, [codeQuery, history, stateQuery]);

  useEffect(() => {
    if (codeQuery && stateQuery === 'zalo-empty') {
      CoreAuthenticationStore.signinZaloAction(codeQuery);
      history.push('');
    }
  }, [codeQuery, history, stateQuery]);

  useEffect(() => {
    if (codeQuery && stateQuery === 'facebook-empty') {
      CoreAuthenticationStore.signinFacebookAction(codeQuery);
      history.push('');
    }
  }, [codeQuery, history, stateQuery]);

  useEffect(() => {
    if (codeQuery && stateQuery?.split('-')[0] === 'zalo_jn2') {
      CoreVoteStore.signInAndVoteAction(stateQuery?.split('-')[1], codeQuery, 'ZALO');
      history.push('?screen=thank-you-vote');
    }
  }, [codeQuery, history, stateQuery]);

  useEffect(() => {
    if (codeQuery && stateQuery?.split('-')[0] === 'facebook_jn2') {
      CoreVoteStore.signInAndVoteAction(stateQuery?.split('-')[1], codeQuery, 'FACEBOOK');
      history.push('?screen=thank-you-vote');
    }
  }, [codeQuery, history, stateQuery]);

  useEffect(() => {
    if (
      !query.has('profile') &&
      !query.has('detail') &&
      !query.has('screen') &&
      !query.has('state') &&
      !query.has('code')
    ) {
      CorePageStore.updatePageAction('HOME');
    }
  }, [query]);

  useEffect(() => {
    if (screenQuery === 'form-contest') {
      CorePageStore.updatePageAction('FORM_CONTEST');
    }
  }, [screenQuery]);

  useEffect(() => {
    if (!!detailQuery && !query.has('screen') && !query.has('state') && !query.has('code')) {
      CorePageStore.updatePageAction('DETAIL');
      CorePostStore.fetchDetailPostAction(detailQuery);
    }
  }, [detailQuery]);

  useEffect(() => {
    if (!!profileQuery && !query.has('screen') && !query.has('state') && !query.has('code')) {
      CorePageStore.updatePageAction('PROFILE');
      CoreUserStore.fetchProfileShareLinkAction(profileQuery);
    }
  }, [profileQuery]);

  useEffect(() => {
    if (screenQuery === 'thank-you-vote') {
      CorePageStore.updatePageAction('THANK_YOU_VOTE');
    }
  }, [screenQuery]);

  useEffect(() => {
    if (screenQuery === 'rule') {
      CorePageStore.updatePageAction('RULE');
    }
  }, [screenQuery]);

  useEffect(() => {
    if (screenQuery === 'prize') {
      CorePageStore.updatePageAction('PRIZE');
    }
  }, [screenQuery]);

  useEffect(() => {
    if (screenQuery === 'list-post') {
      CorePageStore.updatePageAction('LIST_POST');
    }
  }, [screenQuery]);

  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang === 'en') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('vi');
    }
  }, [i18n, lang]);

  // useEffect(() => {
  //   CoreUserStore.fetchUserProfileAction();
  // }, []);

  return (
    <div className={prefixClassName}>
      {pages === 'HOME' && <Home />}

      {pages === 'FORM_CONTEST' && <FormContest />}

      {pages === 'DETAIL' && <Detail />}

      {pages === 'PROFILE' && <Profile />}

      {pages === 'THANK_YOU_VOTE' && <ThankVote />}

      {pages === 'RULE' && <Rule />}

      {pages === 'LIST_POST' && <ListPost />}

      {pages === 'PRIZE' && <PrizePage />}
    </div>
  );
});

export default withTranslation()(MainRoute);
