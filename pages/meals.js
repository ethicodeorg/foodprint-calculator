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
        <div className="meals-page">
          <PageTitle>My meals</PageTitle>
          <MealLink id="new">
            <div className="button-container">
              <Button primary round>
                +
              </Button>
            </div>
          </MealLink>
          {!data.length && <div>You have not saved any meals</div>}
          <div className="meals-container">
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
          </div>

          <style jsx>{`
            .meal {
              font-size: 18px;
              padding-bottom: 20px;
            }
            .button-container {
              position: fixed;
              right: 80px;
              bottom: 50px;
            }
            .meals-page {
              padding: 20px;
              max-width: 1520px;
              margin: 0 auto;
            }
            .meals-container {
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
            }
          `}</style>
        </div>
      ) : (
        <Content>Baking pies...</Content>
      )}
    </Layout>
  );
}
