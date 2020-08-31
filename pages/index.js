import { useEffect } from 'react';
import { FaCalculator, FaUtensils } from 'react-icons/fa';
import { Link } from '../i18n';
import { withTranslation } from '../i18n';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import Content from '../components/Content';
import PageTitle from '../components/PageTitle';
import Button from '../components/Button';
import theme from '../styles/theme';

const Index = ({ t }) => {
  const calculateTextArr = t('calculate_environmental_footprint').split('|');
  useEffect(() => {
    // Clear the deprecated meals cookie so the user won't have a huge cookie not even in use
    document.cookie = 'meals=;';
  });

  return (
    <Layout>
      <Header />
      <div className="front-page">
        <h1>{t('future_begins_now')}</h1>
        <h3>
          <span className="calc-container">
            <FaCalculator />
          </span>
          {calculateTextArr[0]}
          <span className="environmental">{calculateTextArr[1]}</span>
          {calculateTextArr[2]}
          <span className="utensils-container">
            <FaUtensils />
          </span>
        </h3>
        <p>{t('main_function')}</p>
        <Link href="/about?openSection=sources">
          <a className="about-link">{t('this_is_how')}</a>
        </Link>
        <div className="button-container">
          <Button primary animate noPad>
            <Link href="/newmeal">
              <a className="lets-calculate">
                {t('lets_calculate')}
                <span className="calculator-container">
                  <FaCalculator />
                </span>
              </a>
            </Link>
          </Button>
        </div>
      </div>

      <style jsx>{`
        .front-page {
          min-height: 90vh;
          padding: 40px 20px;
          margin: 0 auto;
          color: #fff;
        }
        .button-container {
          display: flex;
          justify-content: space-around;
          margin-top: 40px;
          width: 100%;
        }
        .calculator-container {
          display: flex;
          margin-left: 10px;
          font-size: 14px;
        }
        .utensils-container {
          font-size: 20px;
          margin-left: 10px;
        }
        .calc-container {
          font-size: 20px;
          margin-right: 10px;
        }
        .about-link {
          color: ${theme.colors.lightGreen};
          text-decoration: none;
          font-size: 16px;
        }
        .about-link:hover {
          opacity: 0.7;
        }
        .environmental {
          color: ${theme.colors.lightGreen};
        }
        h1 {
          display: flex;
          flex-wrap: wrap;
          font-size: 56px;
          font-weight: normal;
          margin-top: 120px;
        }
        h3 {
          font-size: 24px;
          font-weight: normal;
        }
        p {
          font-size: 16px;
          margin: 20px 0;
        }
        .lets-calculate {
          display: flex;
          align-items: center;
          padding: 10px 20px;
          color: #fff;
          text-decoration: none;
        }

        @media only screen and (min-width: ${theme.sizes.mobile}) {
          .front-page {
            max-width: 1520px;
            padding: 60px 40px;
          }
          .about-link {
            font-size: 20px;
          }
          h1 {
            font-size: 72px;
            margin-top: 150px;
          }
          h3 {
            font-size: 32px;
          }
          p {
            max-width: 900px;
            font-size: 20px;
          }
          .lets-calculate {
            padding: 15px 40px;
          }
        }

        @media only screen and (min-width: ${theme.sizes.tablet}) {
          .front-page {
            padding: 100px;
          }
          .button-container {
            margin-top: 60px;
            width: 70%;
          }
          .utensils-container,
          .calc-container {
            font-size: 26px;
          }
          h1 {
            font-size: 104px;
          }
          h3 {
            font-size: 40px;
          }
        }
      `}</style>
    </Layout>
  );
};

Index.getInitialProps = async () => ({
  namespacesRequired: ['common', 'index'],
});

export default withTranslation('index')(Index);
