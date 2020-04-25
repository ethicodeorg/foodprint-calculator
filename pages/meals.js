import useSWR from 'swr';
import PieChart from 'react-minimal-pie-chart';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import Content from '../components/Content';
import Pies from '../components/Pies';
import MealLink from '../components/MealLink';

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

export default function Index() {
  const { data, error } = useSWR('/api/meals', fetcher);

  return (
    <Layout>
      <Header activePage="meals" />
      {data ? (
        <Content>
          {data.length > 0 ? (
            <MealLink id="new" title="+ Create new meal" />
          ) : (
            <div>You have not saved any meals</div>
          )}
          {data.map((meal) => {
            return (
              <div className="meal" key={meal.id}>
                <MealLink id={meal.id} title={meal.title} />
                <Pies meal={meal} />
              </div>
            );
          })}
          <MealLink id="new" title="+ Create new meal" />

          <style jsx>{`
            .meal {
              font-size: 18px;
              padding-bottom: 20px;
            }
          `}</style>
        </Content>
      ) : (
        <Content>Loading...</Content>
      )}
    </Layout>
  );
}
