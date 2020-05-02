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
          {!data.length && <div className="no-meals">You have not saved any meals</div>}
          <MealLink id="new">
            <div className="button-container-above">
              <Button primary>+ Create meal</Button>
            </div>
          </MealLink>
          <div className="meals-container">
            {data.map((meal) => {
              return (
                <MealLink id={meal.id} key={meal.id}>
                  <Card>
                    <CardTitle>{meal.title}</CardTitle>
                    <p>{`Serves ${meal.numberOfServings} ${
                      meal.numberOfServings === 1 ? 'person' : 'people'
                    }`}</p>
                    {meal.about && <p>{meal.about}</p>}
                    {meal.link && (
                      <a href={meal.link} className="recipe-link">
                        Link to recipe
                      </a>
                    )}
                    <h3 className="footprint-title">{`Meal's environmental footprint${
                      meal.numberOfServings > 1 ? ' - per person' : ''
                    }`}</h3>
                    <Pies meal={meal} />
                  </Card>
                </MealLink>
              );
            })}
          </div>

          <style jsx>{`
            .no-meals {
              text-align: center;
            }
            .meal {
              font-size: 18px;
              padding-bottom: 20px;
            }
            .button-container {
              position: fixed;
              right: 80px;
              bottom: 50px;
            }
            .button-container-above {
              text-align: center;
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
            .footprint-title {
              margin: 0;
              font-size: 26px;
              font-weight: normal;
            }
            .recipe-link {
              display: block;
              padding-bottom: 20px;
              color: #2196f3;
              text-decoration: none;
            }
            .recipe-link:hover {
              opacity: 0.7;
            }
          `}</style>
        </div>
      ) : (
        <Content>Baking pies...</Content>
      )}
    </Layout>
  );
}
