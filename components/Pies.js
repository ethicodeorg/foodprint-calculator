import { Fragment, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import classNames from 'classnames';
import { getMealPieData } from '../utils/pieUtils';
import Pie from '../components/Pie';
import Button from '../components/Button';
import CardTitle from '../components/CardTitle';
import Ingredients from '../components/Ingredients';
import theme from '../styles/theme';

const Pies = ({ meal, isSingle, numberOfServings }) => {
  const pieData = getMealPieData(meal);
  const [showDetails, setShowDetails] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  return (
    <Fragment>
      {meal.ingredients && (
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
              <Ingredients ingredients={meal.ingredients} numberOfServings={numberOfServings} />
            </Fragment>
          )}
          <div className="separator" />
        </Fragment>
      )}
      <div className="title-container">
        <CardTitle>{`Foodprint${numberOfServings > 1 ? ' - per person' : ''}`}</CardTitle>
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
              <div className="pies-container">
                {extraPies.concat(lastPie).map((pie, pIndex) => (
                  <Pie
                    key={pIndex}
                    category={pie}
                    isSingle={isSingle}
                    label={`${name}: ${percentageString}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .separator {
          border-top: 1px solid ${theme.colors.border};
          margin: 20px 0;
        }
        .title-container {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .button-icon {
          display: flex;
          margin-left: 10px;
          font-size: 10px;
          transition: 0.3s ease-in-out;
        }
        .button-icon-reversed {
          transform: rotate(180deg);
          transition: 0.3s ease-in-out;
        }
        .flex-container {
          display: flex;
          align-items: center;
          flex-wrap: ${showDetails ? 'nowrap' : 'wrap'};
        }
        .pie-container {
          margin: 20px 0 0;
        }
        .category-container {
          display: flex;
          align-items: center;
          margin: 0;
          transition: 0.3s ease-in-out;
        }
        .legend-container {
          min-width: 50%;
          font-size: 14px;
        }
        .pies-container {
          display: flex;
          flex-wrap: ${!showDetails ? 'nowrap' : 'wrap'};
          margin-top: 10px;
        }
        .legend-name {
          font-size: 14px;
        }
        .value {
          font-size: 10px;
        }
        .percentage {
          font-size: 10px;
        }
        .percentage-0 {
          color: ${theme.colors.land};
        }
        .percentage-1 {
          color: ${theme.colors.ghg};
        }
        .percentage-2 {
          color: ${theme.colors.water};
        }
        .percentage-3 {
          color: ${theme.colors.eutro};
        }

        @media only screen and (min-width: ${theme.sizes.mobile}) {
          .button-icon {
            font-size: 14px;
          }
          .legend-name {
            font-size: 18px;
          }
          .value {
            font-size: 14px;
          }
          .percentage {
            font-size: 14px;
          }
        }
      `}</style>
    </Fragment>
  );
};

export default Pies;
