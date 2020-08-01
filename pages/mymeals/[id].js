import { useRouter } from 'next/router';
import useSWR from 'swr';
import MealForm from '../../components/MealForm';
import Layout from '../../components/MyLayout';

const Meal = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout title="Edit Meal">
      <MealForm id={id} />
    </Layout>
  );
};

export default Meal;
