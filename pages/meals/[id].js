import { Fragment } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { FaDivide } from 'react-icons/fa';
import { useUser } from '../../lib/hooks';
import { getLocalStorageMeals } from '../../utils/localStorage';
import Meal from '../../components/Meal';
import Layout from '../../components/MyLayout';
import LoadingOnTop from '../../components/LoadingOnTop';
import Content from '../../components/Content';
import Header from '../../components/Header';

const fetcher = (url) => fetch(url).then((r) => r.json());

const MealPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/meals?id=${id}`, fetcher);
  const meal = data?.meals[0];

  return (
    <Layout title="Edit Meal">
      <Fragment>
        <Header />
        <Content>{meal ? <Meal key={meal._id} meal={meal} /> : <LoadingOnTop />}</Content>
      </Fragment>
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

export default MealPage;
