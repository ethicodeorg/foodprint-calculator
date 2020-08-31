import React, { useState, Fragment } from 'react';
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
import Select from 'react-select';
import { Link, withTranslation } from '../i18n';
import { useUser } from '../lib/hooks';
import theme from '../styles/theme';
import Button from './Button';
import FadingIcons from './FadingIcons';
import Icelandic from '../public/iceland-flag.svg';
import English from '../public/united-kingdom-flag.svg';

const Header = ({ i18n, t }) => {
  const { language, changeLanguage } = i18n;
  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'is', label: 'Íslenska' },
  ];
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

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: 20,
      padding: '0 5px',
      backgroundColor: 'transparent',
      color: theme.colors.white,
      border: 'none',
      minHeight: '25px',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: theme.colors.white,
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: theme.colors.darkBackground,
      color: theme.colors.white,
      width: '90px',
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      opacity: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? theme.colors.aqua : theme.colors.darkBackground,
      color: state.isFocused ? theme.colors.darkBackground : theme.colors.white,
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      width: '0px',
    }),
  };

  return (
    <div className="header">
      <div className="land" />
      <Link href="/">
        <a className="link home">
          {getGlobe()}
          <div className="logo-container">
            <div className="future">FUTURE OF</div>
            <div className="food">FOOD</div>
          </div>
        </a>
      </Link>
      <div className="language-container">
        <div className="flag">
          {language === 'is' && <Icelandic />}
          {language === 'en' && <English />}
        </div>
        <div className="language-select">
          <Select
            value={languageOptions.find((lang) => lang.value === language)}
            placeholder="Language"
            onChange={(val) => changeLanguage(val.value)}
            options={languageOptions}
            hideSelectedOptions
            instanceId="language-select"
            styles={customStyles}
          />
        </div>
      </div>
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
            {t('about')}
          </a>
        </Link>
        <Link href="/meals">
          <a
            className={classNames('link', 'right-side', {
              active: router.route === '/meals',
            })}
          >
            {t('all_meals')}
          </a>
        </Link>
        <Link href="/compare">
          <a
            className={classNames('link', 'right-side', {
              active: router.route === '/compare',
            })}
          >
            {t('compare')}
          </a>
        </Link>
        <Link href="/mymeals">
          <a
            className={classNames('link', 'right-side', {
              active: router.route === '/mymeals',
            })}
          >
            {t('my_meals')}
          </a>
        </Link>
        {user ? (
          <Link href="/user">
            <a
              className={classNames('link', 'user', 'right-side', {
                active: router.route === '/user',
              })}
            >
              <span className="user-settings">{t('settings')}</span>
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
                {t('log_in')}
              </a>
            </Link>
            <Link href="/signup">
              <a
                className={classNames('link', 'right-side', {
                  active: router.route === '/signup',
                })}
              >
                {t('sign_up')}
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
          width: calc(100% - 40px);
          padding: 20px;
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
          margin-left: 0;
          padding: 0;
          font-size: 48px;
          color: ${theme.colors.water};
        }
        .home:hover {
          opacity: 1;
        }
        .logo-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-left: 10px;
          color: ${theme.colors.white};
        }
        .future {
          font-size: 14px;
          line-height: 16px;
        }
        .food {
          font-size: 26px;
          line-height: 20px;
        }
        .language-container {
          display: flex;
          align-items: center;
          margin-right: auto;
          margin-left: 20px;
        }
        .language-select {
          margin-left: -50px;
          width: 90px;
        }
        .flag {
          width: 35px;
          height: ${language === 'is' ? '25.2px' : '17.5px'};
          padding-left: 5px;
        }
        .new {
          display: none;
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
          left: 23px;
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
          .header {
            width: calc(100% - 80px);
            padding: 20px 40px;
          }
          .land {
            left: 43px;
          }
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
            display: flex;
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
          .language-select {
            margin-right: 0;
          }
          .new {
            position: static;
            margin-right: auto;
            margin-left: 40px;
          }
        }
      `}</style>
    </div>
  );
};

export default withTranslation()(Header);
