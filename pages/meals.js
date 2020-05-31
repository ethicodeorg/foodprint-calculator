import React from 'react';
import useSWR from 'swr';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import MealsPage from '../components/MealsPage';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Meals = () => {
  const { data, error } = useSWR('/api/meals?visibility=public', fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <Layout>
      <Header activePage="meals" />
      <MealsPage
        meals={data?.meals}
        title="All Meals"
        emptyMessage="Could not load meals at this time"
      />
    </Layout>
  );
};

export default Meals;
