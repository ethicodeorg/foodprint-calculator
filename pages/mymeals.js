import React from 'react';
import useSWR from 'swr';
import { withTranslation } from '../i18n';
import { useUser } from '../lib/hooks';
import { getLocalStorageMeals } from '../utils/localStorage';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import MealsPage from '../components/MealsPage';

const fetcher = (url) => fetch(url).then((r) => r.json());

const MyMeals = ({ t }) => {
  const [user] = useUser();
  const userId = user ? user._id : '';
  const { data, error, isValidating, mutate } = useSWR(
    user ? `/api/meals?user=${userId}` : null,
    fetcher
  );
  const localStorageMeals = getLocalStorageMeals();
  const meals = userId ? data?.meals : localStorageMeals;

  return (
    <Layout title={t('my_meals')} t={t}>
      <Header />
      <MealsPage
        isValidating={isValidating}
        mutate={mutate}
        meals={meals}
        title={t('my_meals')}
        emptyMessage={t('no_meals')}
        t={t}
      />
    </Layout>
  );
};

export default withTranslation('common')(MyMeals);
