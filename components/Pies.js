import { Fragment, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import classNames from 'classnames';
import { getMealPieData } from '../utils/pieUtils';
import Pie from '../components/Pie';
import Button from '../components/Button';
import CardTitle from '../components/CardTitle';
import Ingredients from '../components/Ingredients';

export default function Pies({ meal, isSingle }) {
  const pieData = getMealPieData(meal);
  const [showDetails, setShowDetails] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  return (
    <Fragment>
      <div className="ingredient-button-container">
        <Button clear onClick={() => setShowIngredients(!showIngredients)}>
          Ingredients
          <span
            className={classNames('button-icon', {
              'button-icon-reversed': showIngredients,
            })}
          >
            <FaChevronDown />
          </span>
        </Button>
      </div>
      {showIngredients && (
        <Fragment>
          <div className="separator" />
          <Ingredients ingredients={meal.ingredients} numberOfServings={meal.numberOfServings} />
        </Fragment>
      )}
      <div className="separator" />
      <div className="title-container">
        <CardTitle>{`Foodprint${meal.numberOfServings > 1 ? ' - per person' : ''}`}</CardTitle>
        <Button small clear onClick={() => setShowDetails(!showDetails)}>
          Details
          <span
            className={classNames('button-icon', {
              'button-icon-reversed': showDetails,
            })}
          >
            <FaChevronDown />
          </span>
        </Button>
      </div>
      <div
        className={classNames('pie-container', {
          'flex-container': !showDetails,
        })}
      >
        {pieData.map((category, cIndex) => {
          const { total, rda, name, unit, color } = category;
          const numberOfExtraPies = Math.floor(total / rda);
          const extraPies = [];

          for (let i = 0; i < numberOfExtraPies; i++) {
            extraPies.push({
              name: name,
              total: rda,
              rda: rda,
              unit: unit,
              color: color,
              isExtra: true,
            });
          }

          const lastPie = {
            name: name,
            total: total % rda,
            rda: rda,
            unit: unit,
            color: color,
          };
          const percentageString = `${((total / rda) * 100).toFixed(2)}% RDA`;

          return (
            <div
              className={classNames('category-container', {
                'flex-container': showDetails,
              })}
              key={cIndex}
            >
              {showDetails && (
                <div className="legend-container">
                  <div className="legend-name">{name}</div>
                  <div className="value">{`${total.toFixed(2)} ${unit}`}</div>
                  <div className="percentage">
                    <span className={`percentage-${cIndex}`}>{percentageString}</span>
                  </div>
                </div>
              )}
              {extraPies.concat(lastPie).map((pie, pIndex) => (
                <Pie
                  key={pIndex}
                  category={pie}
                  isSingle={isSingle}
                  label={`${name}: ${percentageString}`}
                />
              ))}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .separator {
          border-top: 1px solid #ccc;
          margin: 20px 0;
        }
        .title-container {
          display: flex;
          justify-content: space-between;
        }
        .button-icon {
          display: flex;
          margin-left: 10px;
          transition: 0.3s ease-in-out;
        }
        .button-icon-reversed {
          transform: rotate(180deg);
          transition: 0.3s ease-in-out;
        }
        .flex-container {
          display: flex;
          align-items: center;
        }
        .pie-container {
          margin: 20px 0 0;
        }
        .category-container {
          display: flex;
          align-items: center;
          margin: 10px 0;
          transition: 0.3s ease-in-out;
        }
        .legend-container {
          min-width: 240px;
          font-size: 14px;
        }
        .legend-name {
          font-size: 18px;
        }
        .percentage {
        }
        .percentage-0 {
          color: #4caf50;
        }
        .percentage-1 {
          color: #e91e63;
        }
        .percentage-2 {
          color: #2196f3;
        }
        .percentage-3 {
          color: #222;
        }
      `}</style>
    </Fragment>
  );
}
