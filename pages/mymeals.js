import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { withTranslation } from '../i18n';
import { useUser } from '../lib/hooks';
import { getLocalStorageMeals } from '../utils/localStorageMeals';
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
  const [localStorageMeals, setLocalMeals] = useState([]);
  useEffect(() => {
    setLocalMeals(getLocalStorageMeals());
  }, []);
  const meals = userId ? data?.meals : localStorageMeals;

  return (
    <Layout title={t('my_meals')} t={t} showFloater>
      <Header />
      <MealsPage
        isValidating={isValidating}
        mutate={mutate}
        setLocalMeals={setLocalMeals}
        meals={meals}
        title={t('my_meals')}
        emptyMessage={t('no_meals')}
        t={t}
      />
    </Layout>
  );
};

MyMeals.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(MyMeals);
