import React from 'react';
import { getCookie } from '../utils/cookieUtils';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import MealsPage from '../components/MealsPage';

const Meals = () => {
  return (
    <Layout>
      <Header activePage="meals" />
      <MealsPage
        meals={typeof window !== 'undefined' ? JSON.parse(getCookie('meals', document.cookie)) : []}
        title="My Meals"
        emptyMessage="You have not saved any meals"
        showCreateButton
        showEditButton
      />
    </Layout>
  );
};

export default Meals;
