import React, { Fragment, useState, useEffect } from 'react';
import { FaChevronDown, FaDownload } from 'react-icons/fa';
import classNames from 'classnames';
import { Tooltip } from '@material-ui/core';
import { getMealPieData } from '../utils/pieUtils';
import Pie from '../components/Pie';
import Button from '../components/Button';
import CardTitle from '../components/CardTitle';
import Ingredients from '../components/Ingredients';
import theme from '../styles/theme';
import Separator from './Separator';
import { useRouter } from 'next/router';

const Pies = ({ meal, numberOfServings, mealTitle }) => {
  let html2canvas;
  const router = useRouter();
  const pieData = getMealPieData(meal);
  const [showDetails, setShowDetails] = useState(router.route === '/meals/[id]');
  const [showIngredients, setShowIngredients] = useState(false);

  useEffect(() => {
    html2canvas = require('html2canvas');
  });

  const downloadReport = (meal) => {
    if (html2canvas && window && document) {
      const pieContainer = meal._id
        ? document.getElementById(meal._id).getElementsByClassName('pie-container')[0]
        : document.getElementsByClassName('pie-container')[0];

      // Process SVGs for canvas rendering
      let svgElements = pieContainer.querySelectorAll('svg');
      svgElements.forEach((item) => {
        item.setAttribute('width', item.getBoundingClientRect().width);
        item.style.width = null;
      });

      // Convert HTML element to HTML canvas
      html2canvas(pieContainer, {
        scrollY: -window.scrollY, // Vertical positioning
        backgroundColor: null, // Transparent background
      }).then((canvas) => {
        // Create image from canvas
        const dataURL = canvas.toDataURL();
        const title = meal.title || mealTitle || 'Meal';
        let link = document.createElement('a');
        link.download = `${title
          .toLowerCase()
          .replace(/([^a-z0-9 ]+)/g, '') // Remove illegal filename characters
          .replace(/ /g, '-')}-foodprint-report.png`;
        link.href = dataURL;
        link.click();
      });
    }
  };

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
              <Separator />
              <Ingredients ingredients={meal.ingredients} numberOfServings={numberOfServings} />
            </Fragment>
          )}
          <Separator />
        </Fragment>
      )}
      <div className="title-container">
        <div className="title-download">
          <CardTitle>{`Foodprint${numberOfServings > 1 ? ' - per person' : ''}`}</CardTitle>
          {router.route === '/mymeals' && showDetails && (
            <Tooltip title="Download report" placement="right" arrow>
              <button className="download-button" onClick={() => downloadReport(meal)}>
                <FaDownload />
              </button>
            </Tooltip>
          )}
        </div>
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
                    <Tooltip
                      title="For more info on the RDAs, navigate to the about page"
                      placement="right"
                      arrow
                    >
                      <span className={`percentage-${cIndex}`}>{percentageString}</span>
                    </Tooltip>
                  </div>
                </div>
              )}
              <div className="pies-container">
                {extraPies.concat(lastPie).map((pie, pIndex) => (
                  <Pie key={pIndex} category={pie} label={`${name}: ${percentageString}`} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <style jsx>{`
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
          min-width: 50%;
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
        .title-download {
          display: flex;
          align-items: baseline;
        }
        .download-button {
          display: flex;
          align-items: center;
          margin: 0 20px;
          padding: 0;
          font-size: 22px;
          color: ${theme.colors.water};
          background-color: #fff;
          opacity: 1;
          transition: opacity 0.2s;
          cursor: pointer;
          border: none;
          outline: none;
        }
        .download-button:hover {
          opacity: 0.7;
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
