import { Fragment } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { FaDivide } from 'react-icons/fa';
import { useUser } from '../../lib/hooks';
import { getLocalStorageMeals } from '../../utils/localStorage';
import MealForm from '../../components/MealForm';
import Layout from '../../components/MyLayout';
import LoadingOnTop from '../../components/LoadingOnTop';
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
    <Layout title="Edit Meal">
      {meal ? (
        <MealForm meal={meal} />
      ) : (
        <Fragment>
          <Header activePage="mymeals" />
          <Content>
            <LoadingOnTop />
          </Content>
        </Fragment>
      )}
      <style jsx>{`
        .loading-container {
          display: flex;
          justify-content: center;
          margin-top: 100px;
        }
      `}</style>
    </Layout>
  );
};

export default Meal;
