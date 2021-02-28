import React, { Fragment, useState, useEffect } from 'react';
import { FaChartPie, FaChevronDown, FaDownload, FaList } from 'react-icons/fa';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { getMealPieData } from '../utils/pieUtils';
import Pie from '../components/Pie';
import Button from '../components/Button';
import CardTitle from '../components/CardTitle';
import Ingredients from '../components/Ingredients';
import Separator from './Separator';
import MyTooltip from './MyTooltip';
import InfoIcon from './InfoIcon';
import theme from '../styles/theme';

const Pies = ({ meal, numberOfServings, t, isChartView }) => {
  const pieData = getMealPieData(meal);
  const [showDetails, setShowDetails] = useState(true);
  const [showIngredients, setShowIngredients] = useState(false);

  return (
    <Fragment>
      {meal.ingredients && (
        <Fragment>
          <div className="ingredient-button-container">
            <Button clear onClick={() => setShowIngredients(!showIngredients)}>
              {t('ingredients')}
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
              <Separator />
              <Ingredients
                ingredients={meal.ingredients}
                numberOfServings={numberOfServings}
                t={t}
              />
            </Fragment>
          )}
          <Separator />
        </Fragment>
      )}
      {isChartView && (
        <div className="title-container">
          <div className="title-download">
            <CardTitle>{`${t('foodprint')}${
              numberOfServings > 1 ? ` - ${t('per_person')}` : ''
            }`}</CardTitle>
          </div>
          <Button small clear onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? t('less') : t('more')}
            <span
              className={classNames('button-icon', {
                'button-icon-reversed': showDetails,
              })}
            >
              <FaChevronDown />
            </span>
          </Button>
        </div>
      )}
      {showDetails && isChartView && (
        <div className="subtitle-container">
          {t('one_pie')}
          <InfoIcon title={t('des_tooltip_example_pie')} color={theme.colors.water} />
        </div>
      )}
      {isChartView ? (
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
                name: t(name),
                total: rda,
                rda: rda,
                unit: unit,
                color: color,
                isExtra: true,
              });
            }

            const lastPie = {
              name: t(name),
              total: total % rda,
              rda: rda,
              unit: unit,
              color: color,
            };
            const percentageString = `${((total / rda) * 100).toFixed(2)}% ${t('rda')}`;

            return (
              <div
                className={classNames('category-container', {
                  'flex-container': showDetails,
                })}
                key={cIndex}
              >
                {showDetails && (
                  <div className="legend-container">
                    <div className="legend-name">{t(name)}</div>
                    <div className="value">{`${total.toFixed(2)} ${unit}`}</div>
                    <div className="percentage">
                      <span className={`percentage-${cIndex}`}>{percentageString}</span>
                      <InfoIcon title={t(`des_tooltip_${name}`)} color={lastPie.color} />
                    </div>
                  </div>
                )}
                <div className="pies-container">
                  {extraPies.concat(lastPie).map((pie, pIndex) => (
                    <Pie key={pIndex} category={pie} label={`${t(name)}: ${percentageString}`} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="list-container">
          <div className="list-header">Sustainability Facts</div>
          <div className="list-subheader">{`${numberOfServings} Servings per recipe`}</div>
          <div className="list-toprow">Amount per serving</div>
          <div className="list-secondrow">% Daily Earth Share*</div>
          {pieData.map((category, cIndex) => {
            const { name, total, rda, unit } = category;
            return (
              <div className={classNames('list-row', { 'list-row-last': cIndex === 3 })}>
                <div>
                  {`${t(name)}: `}
                  <span className="list-value">{`${total.toFixed(2)} ${unit}`}</span>
                </div>
                <div className="list-percentage">{`${((total / rda) * 100).toFixed(2)}%`}</div>
              </div>
            );
          })}
          <div className="list-footnote">
            *The % Daily Earth Share tells you how much this food contributes to your recommended
            daily impact on the environment for each category.
          </div>
        </div>
      )}
      <style jsx>{`
        .title-container {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .subtitle-container {
          display: flex;
          align-items: center;
          margin: 10px 0 0;
          font-size: 14px;
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
          margin: 10px 0 0;
        }
        .category-container {
          display: flex;
          margin: 0;
          transition: 0.3s ease-in-out;
        }
        .explainer-container {
          display: flex;
          align-items: center;
        }
        .explainer-label {
          font-size: 8px;
          margin-left: 10px;
        }
        .arrow-container {
          display: none;
        }
        .legend-container {
          min-width: 50%;
          font-size: 14px;
        }
        .pies-container {
          display: flex;
          flex-wrap: ${!showDetails ? 'nowrap' : 'wrap'};
          margin-top: 10px;
          min-width: 50%;
        }
        .legend-name {
          font-size: 14px;
        }
        .value {
          font-size: 10px;
        }
        .percentage {
          display: flex;
          align-items: center;
          font-size: 10px;
        }
        .percentage-0 {
          text-decoration: none;
          color: ${theme.colors.land};
        }
        .percentage-1 {
          text-decoration: none;
          color: ${theme.colors.ghg};
        }
        .percentage-2 {
          text-decoration: none;
          color: ${theme.colors.water};
        }
        .percentage-3 {
          text-decoration: none;
          color: ${theme.colors.eutro};
        }
        .title-download {
          display: flex;
          align-items: baseline;
        }
        .download-button,
        .view-toggle-button {
          display: flex;
          align-items: center;
          margin: 0 20px;
          padding: 0;
          font-size: 22px;
          color: ${theme.colors.water};
          background-color: transparent;
          opacity: 1;
          transition: opacity 0.2s;
          cursor: pointer;
          border: none;
          outline: none;
        }
        .download-button:hover,
        .view-toggle-button:hover {
          opacity: 0.7;
        }
        .view-toggle-button {
          color: ${theme.colors.text};
        }
        .new-tab-icon {
          display: inline;
          margin-left: 5px;
          font-size: 12px;
        }
        .list-container {
          border: 1px solid ${theme.colors.text};
          margin-top: 10px;
          padding: 5px;
          font-size: 14px;
        }
        .list-header {
          font-size: 26px;
          border-bottom: 1px solid ${theme.colors.text};
        }
        .list-subheader {
          padding: 4px 0;
          border-bottom: 7px solid ${theme.colors.text};
        }
        .list-toprow {
          padding: 4px 0;
          border-bottom: 3px solid ${theme.colors.text};
        }
        .list-secondrow {
          border-bottom: 1px solid ${theme.colors.text};
          padding: 4px 0;
          text-align: right;
          font-weight: bold;
        }
        .list-row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid ${theme.colors.text};
          padding: 4px 0;
        }
        .list-row-last {
          border-bottom: none;
        }
        .list-value,
        .list-percentage {
          font-weight: bold;
        }
        .list-footnote {
          border-top: 7px solid ${theme.colors.text};
          padding: 4px 0;
          font-size: 10px;
        }

        @media only screen and (min-width: ${theme.sizes.mobile}) {
          .button-icon {
            font-size: 14px;
          }
          .legend-name {
            font-size: 16px;
          }
          .value {
            font-size: 14px;
          }
          .percentage {
            font-size: 14px;
          }
          .explainer-label {
            font-size: 10px;
          }
          .arrow-container {
            display: block;
          }
        }
      `}</style>
    </Fragment>
  );
};

export default Pies;
