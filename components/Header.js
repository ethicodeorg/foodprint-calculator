import Link from 'next/link';
import {
  FaCalculator,
  FaUtensils,
  FaGlobeEurope,
  FaGlobeAfrica,
  FaGlobeAsia,
  FaGlobeAmericas,
} from 'react-icons/fa';
import classNames from 'classnames';
import theme from '../styles/theme';

const Header = ({ activePage }) => (
  <div className="header">
    <div className="land" />
    <Link href="/">
      <a
        className={classNames('link home', {
          active: activePage === 'home',
        })}
      >
        {activePage === 'home' && <FaGlobeAmericas />}
        {activePage === 'meals' && <FaGlobeAsia />}
        {activePage === 'new' && <FaGlobeAfrica />}
        {activePage === 'about' && <FaGlobeEurope />}
      </a>
    </Link>
    <Link href="/meals/new">
      <a
        className={classNames('link new', {
          active: activePage === 'new',
        })}
      >
        <span className="utensils-icon-container">
          <FaUtensils />
        </span>
        <span className="calculator-icon-container">
          <FaCalculator />
        </span>
      </a>
    </Link>
    <Link href="/meals">
      <a
        className={classNames('link', {
          active: activePage === 'meals',
        })}
      >
        My Meals
      </a>
    </Link>
    <Link href="/about">
      <a
        className={classNames('link', {
          active: activePage === 'about',
        })}
      >
        About
      </a>
    </Link>

    <style jsx>{`
      .header {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: calc(100% - 80px);
        padding: 20px 40px;
        background-color: ${theme.colors.darkBackground};
      }
      .link {
        display: flex;
        color: #fff;
        text-decoration: none;
        font-size: 24px;
        font-weight: normal;
        margin-left: 30px;
        opacity: 1;
        transition: opacity 0.2s;
      }
      .link:hover {
        opacity: 0.7;
      }
      .active {
        color: ${theme.colors.ghg};
      }
      .home {
        margin-right: auto;
        margin-left: 0;
        font-size: 48px;
        color: ${theme.colors.water};
      }
      .home:hover {
        opacity: 1;
      }
      .new {
        position: fixed;
        margin: 0;
        left: calc(50% - 42px);
        top: 28px;
        font-size: 32px;
      }
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
      .land {
        position: fixed;
        left: 43px;
        height: 43px;
        width: 43px;
        margin-left: 0;
        border-radius: 100%;
        background-color: ${theme.colors.land};
        z-index: -1;
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
  </div>
);

export default Header;
