import useSWR from 'swr';
import PieChart from 'react-minimal-pie-chart';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import Content from '../components/Content';
import Pies from '../components/Pies';
import MealLink from '../components/MealLink';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';

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
          <PageTitle>My meals</PageTitle>
          <MealLink id="new">
            <Button>+ Create new meal</Button>
          </MealLink>
          {!data.length && <div>You have not saved any meals</div>}
          {data.map((meal) => {
            return (
              <MealLink id={meal.id} key={meal.id}>
                <Card>
                  <CardTitle>{meal.title}</CardTitle>
                  {meal.about && <p>{meal.about}</p>}
                  <Pies meal={meal} />
                </Card>
              </MealLink>
            );
          })}

          <style jsx>{`
            .meal {
              font-size: 18px;
              padding-bottom: 20px;
            }
          `}</style>
        </Content>
      ) : (
        <Content>Baking pies...</Content>
      )}
    </Layout>
  );
}
