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
  let meals = [];

  if (userId) {
    // If the user is logged in, we use his saved data in the database
    const { data, error } = useSWR(`/api/meals?user=${userId}`, fetcher);
    if (error) return <div>failed to load</div>;
    meals = data?.meals;
  } else {
    // Otherwise, we use localStorage
    meals = getLocalStorageMeals();
  }

  return (
    <Layout>
      <Header activePage="mymeals" />
      <MealsPage
        meals={meals}
        title="My Meals"
        emptyMessage="You have not saved any meals"
        showCreateButton
        showEditButton
        showDeleteButton
      />
    </Layout>
  );
};

export default MyMeals;
