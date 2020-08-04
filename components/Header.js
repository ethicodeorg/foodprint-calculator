import React, { useState, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  FaGlobeEurope,
  FaGlobeAfrica,
  FaGlobeAsia,
  FaGlobeAmericas,
  FaHamburger,
  FaPizzaSlice,
  FaUser,
} from 'react-icons/fa';
import classNames from 'classnames';
import { useUser } from '../lib/hooks';
import theme from '../styles/theme';
import Button from './Button';
import FadingIcons from './FadingIcons';

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user] = useUser();

  const getGlobe = () => {
    switch (router.route) {
      case '/':
      case '/user':
      case '/email-verified':
        return <FaGlobeAmericas />;
      case '/meals':
      case '/meals/[id]':
      case '/mymeals':
      case '/mymeals/[id]':
        return <FaGlobeAsia />;
      case '/newmeal':
      case '/signup':
      case '/compare':
        return <FaGlobeAfrica />;
      case '/about':
      case '/login':
      case '/forgot-password':
        return <FaGlobeEurope />;
      default:
        return <FaGlobeEurope />;
    }
  };

  return (
    <div className="header">
      <div className="land" />
      <Link href="/">
        <a className="link home">{getGlobe()}</a>
      </Link>
      <Link href="/newmeal">
        <a className="link new">
          <FadingIcons />
        </a>
      </Link>
      <div className="menu-items">
        <Link href="/about">
          <a
            className={classNames('link', 'right-side', {
              active: router.route === '/about',
            })}
          >
            About
          </a>
        </Link>
        <Link href="/meals">
          <a
            className={classNames('link', 'right-side', {
              active: router.route === '/meals',
            })}
          >
            All meals
          </a>
        </Link>
        <Link href="/compare">
          <a
            className={classNames('link', 'right-side', {
              active: router.route === '/compare',
            })}
          >
            Compare
          </a>
        </Link>
        <Link href="/mymeals">
          <a
            className={classNames('link', 'right-side', {
              active: router.route === '/mymeals',
            })}
          >
            My Meals
          </a>
        </Link>
        {user ? (
          <Link href="/user">
            <a
              className={classNames('link', 'user', 'right-side', {
                active: router.route === '/user',
              })}
            >
              <span className="user-settings">Settings</span>
              <span className="user-icon">
                <FaUser />
              </span>
            </a>
          </Link>
        ) : (
          <Fragment>
            <Link href="/login">
              <a
                className={classNames('link', 'right-side', {
                  active: router.route === '/login',
                })}
              >
                Log In
              </a>
            </Link>
            <Link href="/signup">
              <a
                className={classNames('link', 'right-side', {
                  active: router.route === '/signup',
                })}
              >
                Sign Up
              </a>
            </Link>
          </Fragment>
        )}
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
          z-index: 1;
        }
        .menu-items {
          display: block;
          position: fixed;
          top: 88px;
          right: ${isMenuOpen ? '0' : '-220px'};
          padding: 10px 40px;
          background-color: ${theme.colors.darkBackground};
          transition: right 0.5s;
        }
        .link {
          display: flex;
          padding: 10px 0;
          text-decoration: none;
          font-size: 16px;
          font-weight: normal;
          opacity: 1;
          transition: opacity 0.2s;
        }
        .link:hover {
          opacity: 0.7;
        }
        .right-side {
          color: #fff;
        }
        .active {
          color: ${theme.colors.ghg};
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
        .user {
          display: flex;
          padding: 0;
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
        .user-settings {
          display: inline;
          font-size: 16px;
          padding: 10px 0;
        }
        .user-icon {
          display: none;
        }

        @media only screen and (min-width: ${theme.sizes.mobile}) {
          .menu-items {
            padding: 20px 50px;
          }
          .link {
            font-size: 18px;
          }
          .home {
            font-size: 48px;
          }
          .new {
            font-size: 32px;
          }
          .user {
            font-size: 24px;
          }
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
          .right-side {
            margin-left: 20px;
          }
          .user-settings {
            display: none;
          }
          .user-icon {
            display: flex;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
