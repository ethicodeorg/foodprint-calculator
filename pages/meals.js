import React, { useState, Fragment } from 'react';
import { FaEdit, FaExternalLinkAlt, FaCalculator } from 'react-icons/fa';
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
import TinyPies from '../components/TinyPies';
import theme from '../styles/theme';

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
          <div className="buttons-container">
            <MealLink id="new">
              <Button primary>
                Create meal
                <span className="calculator-container">
                  <FaCalculator />
                </span>
              </Button>
            </MealLink>
          </div>
          <div className="meals-container">
            {data.map((meal) => {
              return (
                <div className="meal" key={meal.id}>
                  <Card>
                    <div className="title-container">
                      <CardTitle>{meal.title}</CardTitle>
                      <div className="edit-button-container">
                        <MealLink id={meal.id}>
                          <FaEdit />
                        </MealLink>
                      </div>
                    </div>
                    <p>{`Serves ${meal.numberOfServings} ${
                      meal.numberOfServings === 1 ? 'person' : 'people'
                    }`}</p>
                    {meal.about && <p className="about-meal">{meal.about}</p>}
                    {meal.link && (
                      <a href={meal.link} target="_blank" className="recipe-link">
                        Link to recipe
                        <span className="button-icon">
                          <FaExternalLinkAlt />
                        </span>
                      </a>
                    )}
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
              align-items: baseline;
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
            .buttons-container {
              display: flex;
              flex-direction: row-reverse;
              padding: 0 10px;
            }
            .edit-button-container {
              color: ${theme.colors.water};
              font-size: 24px;
            }
            .button-icon {
              display: inline;
              margin-left: 10px;
              font-size: 14px;
            }
            .calculator-container {
              display: flex;
              margin-left: 20px;
              font-size: 14px;
            }
            .meals-page {
              padding: 20px;
              max-width: 1240px;
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
              color: ${theme.colors.water};
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
