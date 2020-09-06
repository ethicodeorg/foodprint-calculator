import React from 'react';
import { connect } from 'react-redux';
import useSWR from 'swr';
import { withTranslation } from '../i18n';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import MealsPage from '../components/MealsPage';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Compare = ({ comparisons, t }) => {
  const ids = comparisons.join(',');
  const { data, error } = useSWR(`/api/meals?id=${ids || 'empty'}`, fetcher);

  if (error) return <div>{t('error_failed')}</div>;

  return (
    <Layout title={t('compare_meals')} t={t}>
      <Header />
      <MealsPage
        meals={data?.meals}
        title={t('compare_meals')}
        emptyMessage={t('no_meals_compare')}
        t={t}
      />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  comparisons: state.comparisons,
});

export default connect(mapStateToProps)(withTranslation('common')(Compare));
