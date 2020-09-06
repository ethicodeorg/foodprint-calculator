import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { withTranslation } from '../i18n';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import MealsPage from '../components/MealsPage';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Meals = ({ t }) => {
  const router = useRouter();
  const { visibility, user, search, sortBy } = router.query;
  let queryString = `?visibility=${visibility || 'public'}&sortBy=${sortBy || 'landUse'}`;
  let queries = {
    sortBy: sortBy || 'landUse',
  };

  if (user) {
    queryString += `&user=${user}`;
    queries.user = user;
  }

  if (search) {
    queryString += `&search=${search}`;
    queries.search = search;
  }

  const { data, error } = useSWR(`/api/meals${queryString}`, fetcher);

  if (error) return <div>{t('error_failed')}</div>;

  return (
    <Layout title={t('all_meals')} t={t}>
      <Header />
      <MealsPage
        meals={data?.meals}
        title={t('all_meals')}
        emptyMessage={t('error_no_meals')}
        queries={queries}
        t={t}
      />
    </Layout>
  );
};

export default withTranslation('common')(Meals);
