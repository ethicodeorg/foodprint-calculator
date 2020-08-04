import React from 'react';
import useSWR from 'swr';
import { useUser } from '../lib/hooks';
import { getLocalStorageMeals } from '../utils/localStorage';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import MealsPage from '../components/MealsPage';

const fetcher = (url) => fetch(url).then((r) => r.json());

const MyMeals = () => {
  const [user] = useUser();
  const userId = user ? user._id : '';
  const { data, error, isValidating, mutate } = useSWR(
    user ? `/api/meals?user=${userId}` : null,
    fetcher
  );
  const localStorageMeals = getLocalStorageMeals();
  const meals = userId ? data?.meals : localStorageMeals;

  return (
    <Layout title="My Meals">
      <Header />
      <MealsPage
        isValidating={isValidating}
        mutate={mutate}
        meals={meals}
        title="My Meals"
        emptyMessage="You have not saved any meals"
      />
    </Layout>
  );
};

export default MyMeals;
