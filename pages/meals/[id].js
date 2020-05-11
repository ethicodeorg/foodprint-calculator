import { useRouter } from 'next/router';
import { getCookie } from '../../utils/cookieUtils';
import MealForm from '../../components/MealForm';

const Meal = () => {
  const router = useRouter();
  const mealId = router.asPath.split('/').slice(-1)[0];
  const meals =
    typeof window !== 'undefined' ? JSON.parse(getCookie('meals', document.cookie)) : [];
  const meal = meals.find((m) => m.id === mealId);

  return <MealForm meal={meal} />;
};

export default Meal;
