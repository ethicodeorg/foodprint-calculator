import React, { useState, Fragment } from 'react';
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
import Ingredients from '../components/Ingredients';

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

export default function Index() {
  const { data, error } = useSWR('/api/meals', fetcher);
  const [showIngredients, setShowIngredients] = useState(false);

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
          <div className="button-container-below">
            <Button secondary onClick={() => setShowIngredients(!showIngredients)}>
              {`${showIngredients ? 'Hide' : 'Show'} environmental footprints per ingredient`}
            </Button>
          </div>
          <div className="meals-container">
            {data.map((meal) => {
              return (
                <div className="meal">
                  <Card>
                    <div className="title-container">
                      <CardTitle>{meal.title}</CardTitle>
                      <MealLink id={meal.id} key={meal.id}>
                        <Button seconary small>
                          Edit
                        </Button>
                      </MealLink>
                    </div>
                    <p>{`Serves ${meal.numberOfServings} ${
                      meal.numberOfServings === 1 ? 'person' : 'people'
                    }`}</p>
                    {meal.about && <p className="about-meal">{meal.about}</p>}
                    {meal.link && (
                      <a href={meal.link} target="_blank" className="recipe-link">
                        Link to recipe
                      </a>
                    )}
                    {showIngredients && (
                      <Fragment>
                        <div className="separator" />
                        <Ingredients
                          ingredients={meal.ingredients}
                          numberOfServings={meal.numberOfServings}
                        />
                      </Fragment>
                    )}
                    <div className="separator" />
                    <CardTitle>{`Foodprint${
                      meal.numberOfServings > 1 ? ' - per person' : ''
                    }`}</CardTitle>
                    <Pies meal={meal} />
                  </Card>
                </div>
              );
            })}
          </div>

          <style jsx>{`
            .no-meals {
              text-align: center;
            }
            .title-container {
              display: flex;
              justify-content: space-between;
            }
            .meal {
              width: 600px;
              margin: 0 10px;
              padding-bottom: 20px;
              font-size: 18px;
            }
            .about-meal {
              font-size: 14px;
            }
            .separator {
              border-top: 1px solid #ccc;
              margin: 20px 0;
            }
            .button-container-above,
            .button-container-below {
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
