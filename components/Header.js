import React, { useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { FaHamburger, FaPizzaSlice, FaUser } from 'react-icons/fa';
import Flags from 'country-flag-icons/react/3x2';
import classNames from 'classnames';
import Select from 'react-select';
import { Link, withTranslation } from '../i18n';
import { useUser } from '../lib/hooks';
import theme from '../styles/theme';

const Header = ({ t, i18n }) => {
  const { language, changeLanguage } = i18n;
  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'is', label: 'Íslenska' },
    { value: 'fr', label: 'Français' },
    { value: 'it', label: 'Italiano' },
    { value: 'pt', label: 'Português' },
  ];
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user] = useUser();

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
      width: '110px',
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
    indicatorsContainer: (provided, state) => ({
      ...provided,
      display: typeof window !== 'undefined' && window.innerWidth < 600 ? 'none' : 'block',
    }),
  };

  return (
    <div className="header">
      <Link href="/">
        <a className="link home">
          <div className="logo-container">
            <img
              className="earth-logo"
              src={`/${language === 'is' ? 'spori' : 'foode'}-logo.png`}
            />
          </div>
        </a>
      </Link>
      <div className="language-container">
        <div className="flag">
          {language === 'is' && <Flags.IS />}
          {language === 'en' && <Flags.GB />}
          {language === 'fr' && <Flags.FR />}
          {language === 'it' && <Flags.IT />}
          {language === 'pt' && <Flags.PT />}
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
        .earth-logo {
          height: 48px;
        }
        .menu-items {
          display: block;
          position: fixed;
          top: 88px;
          right: ${isMenuOpen ? '0' : '-230px'};
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
          margin-right: auto;
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
          color: ${theme.colors.white};
        }
        .foodprint {
          font-size: 14px;
          line-height: 16px;
        }
        .calculator {
          font-size: 13px;
          line-height: 15px;
        }
        .spori {
          font-size: 30px;
        }
        .language-container {
          display: flex;
          align-items: center;
        }
        .language-select {
          margin-left: -50px;
          width: 65px;
        }
        .flag {
          width: 36px;
          height: 24px;
          padding-left: 5px;
        }
        .user {
          display: flex;
          padding: 0;
        }
        .burger-container {
          display: flex;
          margin-left: 10px;
          font-size: 32px;
          color: ${theme.colors.green};
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
          .menu-items {
            padding: 20px 50px;
          }
          .link {
            font-size: 18px;
          }
          .home {
            font-size: 48px;
          }
          .user {
            font-size: 24px;
          }
          .language-select {
            width: 90px;
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
        }
      `}</style>
    </div>
  );
};

export default withTranslation('common')(Header);
