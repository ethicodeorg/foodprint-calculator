import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import MealForm from '../../components/MealForm';
import Layout from '../../components/MyLayout';

const Meal = ({ meals }) => {
  const router = useRouter();
  const mealId = router.asPath.split('/').slice(-1)[0];
  const meal = meals.find((m) => m.id === mealId);

  return (
    <Layout>
      <MealForm meal={meal} />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  meals: state.meals,
});

export default connect(mapStateToProps)(Meal);
