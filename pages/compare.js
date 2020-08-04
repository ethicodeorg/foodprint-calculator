import React from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import MealsPage from '../components/MealsPage';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Compare = ({ comparisons }) => {
  const ids = comparisons.join(',');
  const { data, error } = useSWR(`/api/meals?id=${ids || 'empty'}`, fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <Layout title="Compare Meals">
      <Header />
      <MealsPage meals={data?.meals} title="Compare Meals" emptyMessage="No meals to compare" />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  comparisons: state.comparisons,
});

export default connect(mapStateToProps)(Compare);
