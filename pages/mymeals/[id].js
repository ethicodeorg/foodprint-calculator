import { useRouter } from 'next/router';
import fetch from 'node-fetch';
import useSWR from 'swr';
import { withTranslation } from '../../i18n';
import MealForm from '../../components/MealForm';
import Layout from '../../components/MyLayout';

const Meal = ({ t, foodData }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout title={t('edit_meal')} t={t}>
      <MealForm id={id} t={t} foodData={foodData} />
    </Layout>
  );
};

Meal.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/foods', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
  });
  const json = await res.json();

  return {
    foodData: json.foods,
    namespacesRequired: ['common'],
  };
};

export default withTranslation('common')(Meal);
