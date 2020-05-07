import Link from 'next/link';
import { FaCalculator, FaEdit } from 'react-icons/fa';
import Pies from '../components/Pies';
import MealLink from '../components/MealLink';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import Button from '../components/Button';
import PageTitle from '../components/PageTitle';
import ExternalLink from '../components/ExternalLink';
import theme from '../styles/theme';

const MealsPage = ({ meals, title, emptyMessage, showCreateButton, showEditButton }) => {
  return (
    <div className="meals-page">
      <PageTitle>{title}</PageTitle>
      {!meals.length && <div className="no-meals">{emptyMessage}</div>}
      {showCreateButton && (
        <div className="buttons-container">
          <Button primary>
            <Link href="/newmeal">
              <a className="create-meal">
                Create meal
                <span className="calculator-container">
                  <FaCalculator />
                </span>
              </a>
            </Link>
          </Button>
        </div>
      )}
      <div className="meals-container">
        {meals.map((meal) => {
          return (
            <div className="meal" key={meal.id}>
              <Card>
                <div className="title-container">
                  <CardTitle>{meal.title}</CardTitle>
                  {showEditButton && (
                    <div className="edit-button-container">
                      <MealLink id={meal.id}>
                        <FaEdit />
                      </MealLink>
                    </div>
                  )}
                </div>
                <p>{`Serves ${meal.numberOfServings} ${
                  meal.numberOfServings === 1 ? 'person' : 'people'
                }`}</p>
                {meal.about && <p className="about-meal">{meal.about}</p>}
                {meal.link && <ExternalLink href={meal.link}>Link to recipe </ExternalLink>}
                <Pies meal={meal} numberOfServings={meal.numberOfServings} />
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
        .calculator-container {
          display: flex;
          margin-left: 10px;
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
        .create-meal {
          display: flex;
          align-items: center;
          color: #fff;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default MealsPage;
