import React, { Fragment, useState, useEffect } from 'react';
import { FaChevronDown, FaDownload, FaExternalLinkAlt, FaLongArrowAltLeft } from 'react-icons/fa';
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
import { Link } from '../i18n';

const Pies = ({ meal, numberOfServings, mealTitle, t }) => {
  let html2canvas;
  const router = useRouter();
  const pieData = getMealPieData(meal);
  const [showDetails, setShowDetails] = useState(true);
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
      <div className="title-container">
        <div className="title-download">
          <CardTitle>{`${t('foodprint')}${
            numberOfServings > 1 ? ` - ${t('per_person')}` : ''
          }`}</CardTitle>
          {router.route === '/mymeals' && (
            <Tooltip title={t('download_report')} placement="right" arrow>
              <button className="download-button" onClick={() => downloadReport(meal)}>
                <FaDownload />
              </button>
            </Tooltip>
          )}
        </div>
        <Button small clear onClick={() => setShowDetails(!showDetails)}>
          {t('details')}
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
        {pieData
          .filter((_, i) => i > 0 || showDetails)
          .map((category, cIndex) => {
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
                    {cIndex > 0 && <div className="value">{`${total.toFixed(2)} ${unit}`}</div>}
                    <div className="percentage">
                      <Link href="/about?openSection=rda">
                        <a className={`percentage-${cIndex}`} target="_blank">
                          <Tooltip title={t('daily_earth_share')} placement="right" arrow>
                            <span>
                              {percentageString}
                              <span className="new-tab-icon">
                                <FaExternalLinkAlt />
                              </span>
                            </span>
                          </Tooltip>
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
                <div className={`pies-container pies-container-${cIndex}`}>
                  {extraPies.concat(lastPie).map((pie, pIndex) => (
                    <Pie key={pIndex} category={pie} label={`${t(name)}: ${percentageString}`} />
                  ))}
                </div>
                {showDetails && cIndex === 0 && (
                  <div className="explainer-container">
                    <div className="arrow-container">
                      <FaLongArrowAltLeft />
                    </div>
                    <div className="explainer-label">{t('one_pie')}</div>
                  </div>
                )}
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
        .pies-container-0 {
          min-width: ${showDetails ? '80px' : 'unset'};
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
          text-decoration: none;
          color: ${theme.colors.orange};
        }
        .percentage-1 {
          text-decoration: none;
          color: ${theme.colors.land};
        }
        .percentage-2 {
          text-decoration: none;
          color: ${theme.colors.ghg};
        }
        .percentage-3 {
          text-decoration: none;
          color: ${theme.colors.water};
        }
        .percentage-4 {
          text-decoration: none;
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
          background-color: transparent;
          opacity: 1;
          transition: opacity 0.2s;
          cursor: pointer;
          border: none;
          outline: none;
        }
        .download-button:hover {
          opacity: 0.7;
        }
        .new-tab-icon {
          display: inline;
          margin-left: 5px;
          font-size: 12px;
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
