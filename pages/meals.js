import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import MealsPage from '../components/MealsPage';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Meals = () => {
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

  if (error) return <div>failed to load</div>;

  return (
    <Layout title="All Meals">
      <Header />
      <MealsPage
        meals={data?.meals}
        title="All Meals"
        emptyMessage="Could not load meals at this time"
        queries={queries}
      />
    </Layout>
  );
};

export default Meals;
