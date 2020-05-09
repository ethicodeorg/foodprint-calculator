import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaCalculator,
  FaUtensils,
  FaGlobeEurope,
  FaGlobeAfrica,
  FaGlobeAsia,
  FaGlobeAmericas,
  FaHamburger,
  FaPizzaSlice,
} from 'react-icons/fa';
import classNames from 'classnames';
import theme from '../styles/theme';
import Button from './Button';
import FadingIcons from './FadingIcons';

const Header = ({ activePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="header">
      <div className="land" />
      <Link href="/">
        <a className="link home">
          {activePage === 'home' && <FaGlobeAmericas />}
          {(activePage === 'meals' || activePage === 'examples') && <FaGlobeAsia />}
          {activePage === 'new' && <FaGlobeAfrica />}
          {activePage === 'about' && <FaGlobeEurope />}
        </a>
      </Link>
      <Link href="/newmeal">
        <a className="link new">
          <FadingIcons />
        </a>
      </Link>
      <div className="menu-items">
        <Link href="/examples">
          <a className="link examples">Examples</a>
        </Link>
        <Link href="/meals">
          <a className="link meals">My Meals</a>
        </Link>
        <Link href="/about">
          <a className="link about">About</a>
        </Link>
      </div>
      <div className="burger-container" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaPizzaSlice /> : <FaHamburger />}
      </div>

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
        .menu-items {
          display: block;
          position: fixed;
          top: 88px;
          right: ${isMenuOpen ? '0' : '-220px'};
          padding: 20px 50px;
          background-color: ${theme.colors.darkBackground};
          transition: right 0.5s;
        }
        .link {
          display: flex;
          padding: 10px 0;
          text-decoration: none;
          font-size: 24px;
          font-weight: normal;
          opacity: 1;
          transition: opacity 0.2s;
        }
        .link:hover {
          opacity: 0.7;
        }
        .examples {
          color: ${activePage === 'examples' ? theme.colors.ghg : '#fff'};
        }
        .meals {
          color: ${activePage === 'meals' ? theme.colors.ghg : '#fff'};
        }
        .about {
          color: ${activePage === 'about' ? theme.colors.ghg : '#fff'};
        }
        .home {
          display: flex;
          margin-right: auto;
          margin-left: 0;
          padding: 0;
          font-size: 48px;
          color: ${theme.colors.water};
        }
        .home:hover {
          opacity: 1;
        }
        .new {
          display: flex;
          position: fixed;
          margin: 0;
          padding: 0;
          left: calc(50% - 42px);
          top: 28px;
          font-size: 32px;
        }
        .burger-container {
          display: flex;
          font-size: 32px;
          color: ${theme.colors.green};
        }
        .land {
          position: fixed;
          left: 43px;
          height: 43px;
          width: 43px;
          margin-left: 0;
          border-radius: 100%;
          background-color: ${theme.colors.green};
          z-index: -1;
        }

        @media only screen and (min-width: ${theme.sizes.tablet}) {
          .menu-items {
            display: flex;
            position: static;
            padding: 0;
          }
          .burger-container {
            display: none;
          }
          .link {
            padding: 0;
          }
          .examples,
          .meals,
          .about {
            margin-left: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
