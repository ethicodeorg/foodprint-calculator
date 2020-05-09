import React, { Fragment } from 'react';
import { FaCalculator, FaUtensils } from 'react-icons/fa';
import theme from '../styles/theme';

const FadingIcons = () => (
  <Fragment>
    <span className="utensils-icon-container">
      <FaUtensils />
    </span>
    <span className="calculator-icon-container">
      <FaCalculator />
    </span>
    <style jsx>{`
      .utensils-icon-container {
        margin: 0 5px;
        color: ${theme.colors.land};
        animation: colorfade2 30s linear 0s infinite;
      }
      .calculator-icon-container {
        margin: 0 5px;
        color: ${theme.colors.land};
        animation: colorfade 30s linear 0s infinite;
      }
      @keyframes colorfade {
        0% {
          color: ${theme.colors.land};
        }
        20% {
          color: ${theme.colors.green};
        }
        40% {
          color: ${theme.colors.aqua};
        }
        80% {
          color: ${theme.colors.teal};
        }
        100% {
          color: ${theme.colors.land};
        }
      }
      @keyframes colorfade2 {
        0% {
          color: ${theme.colors.green};
        }
        20% {
          color: ${theme.colors.aqua};
        }
        40% {
          color: ${theme.colors.teal};
        }
        80% {
          color: ${theme.colors.land};
        }
        100% {
          color: ${theme.colors.green};
        }
      }
    `}</style>
  </Fragment>
);

export default FadingIcons;
