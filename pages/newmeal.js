import fetch from 'node-fetch';
import { withTranslation } from '../i18n';
import MealForm from '../components/MealForm';
import Layout from '../components/MyLayout';

const NewMeal = ({ t, foodData }) => (
  <Layout title={t('new_meal')} t={t}>
    <MealForm t={t} foodData={foodData} />
  </Layout>
);

NewMeal.getInitialProps = async () => {
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

export default withTranslation('common')(NewMeal);
