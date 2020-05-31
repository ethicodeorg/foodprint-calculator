import { Fragment } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { FaDivide } from 'react-icons/fa';
import { useUser } from '../../lib/hooks';
import { getLocalStorageMeals } from '../../utils/localStorage';
import MealForm from '../../components/MealForm';
import Layout from '../../components/MyLayout';
import Loading from '../../components/Loading';
import Content from '../../components/Content';
import Header from '../../components/Header';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Meal = () => {
  const router = useRouter();
  const [user] = useUser();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/meals?id=${id}`, fetcher);
  const localStorageMeals = getLocalStorageMeals();
  const meal = user ? data?.meals[0] : localStorageMeals.find((m) => m._id === id);

  return (
    <Layout>
      {meal ? (
        <MealForm meal={meal} />
      ) : (
        <Fragment>
          <Header activePage="mymeals" />
          <Content>
            <Loading />
          </Content>
        </Fragment>
      )}
    </Layout>
  );
};

export default Meal;
