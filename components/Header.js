import Link from 'next/link';
import {
  FaCalculator,
  FaGlobeEurope,
  FaGlobeAfrica,
  FaGlobeAsia,
  FaGlobeAmericas,
} from 'react-icons/fa';
import classNames from 'classnames';
import theme from '../styles/theme';

const Header = ({ activePage }) => (
  <div className="header">
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
        <FaCalculator />
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
      .new {
        position: fixed;
        margin: 0;
        left: calc(50% - 16px);
        font-size: 32px;
        color: ${theme.colors.land};
      }
    `}</style>
  </div>
);

export default Header;
