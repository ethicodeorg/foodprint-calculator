import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import MealsPage from '../components/MealsPage';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Meals = () => {
  const router = useRouter();
  const { visibility, user, sortBy } = router.query;
  let queryString = `?visibility=${visibility || 'public'}`;

  if (user) {
    queryString += `&user=${user}`;
  }

  if (sortBy) {
    queryString += `&sortBy=${sortBy}`;
  }

  const { data, error } = useSWR(`/api/meals${queryString}`, fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <Layout title="All Meals">
      <Header activePage="meals" />
      <MealsPage
        meals={data?.meals}
        title="All Meals"
        emptyMessage="Could not load meals at this time"
        filters
      />
    </Layout>
  );
};

export default Meals;
