import { useEffect } from 'react';
import { FaCalculator, FaUtensils } from 'react-icons/fa';
import { Link, withTranslation } from '../i18n';
import { splitTranslationWithLink, SPLITTER } from '../utils/translationUtils';
import Header from '../components/Header';
import Layout from '../components/MyLayout';
import Button from '../components/Button';
import theme from '../styles/theme';
import Card from '../components/Card';

const Index = ({ t }) => {
  const headlineText = splitTranslationWithLink(t('slogan', SPLITTER));
  useEffect(() => {
    // Clear the deprecated meals cookie so the user won't have a huge cookie
    document.cookie = 'meals=;';
  });

  return (
    <Layout t={t}>
      <Header />
      <div className="front-page">
        <div className="headline">
          <h1>
            {headlineText.beforeLink}
            <span className="true">{headlineText.linkText}</span>
            {headlineText.afterLink}
          </h1>
        </div>
        <div className="intro-container">
          <Card seeThrough dark>
            <div className="intro-item">
              <p>{t('food_e_function')}</p>
            </div>
          </Card>
        </div>
        <div className="button-container">
          <Button primary animate noPad>
            <Link href="/newmeal">
              <a className="calculate">
                <span className="calc-container">
                  <FaCalculator />
                </span>
                {t('start').toUpperCase()}
                <span className="utensils-container">
                  <FaUtensils />
                </span>
              </a>
            </Link>
          </Button>
        </div>
      </div>

      <style jsx>{`
        .front-page {
          padding: 40px 0 130px;
          margin: 0 auto;
          color: #fff;
        }
        .headline {
          display: flex;
          justify-content: space-between;
          margin: 80px 0 20px;
          padding: 0 20px;
        }
        .intro-container {
          display: flex;
          justify-content: space-around;
        }
        .intro-item {
          display: flex;
        }
        .button-container {
          display: flex;
          justify-content: space-around;
          margin: 40px 0;
          padding: 0 20px;
          width: calc(100% - 40px);
          animation: pulse 10s linear 0s infinite;
        }
        .calc-container {
          display: flex;
          font-size: 26px;
          margin-right: 20px;
        }
        .utensils-container {
          display: flex;
          font-size: 26px;
          margin-left: 20px;
        }
        .true {
          color: ${theme.colors.eutro};
          animation: colorfade 10s linear 0s infinite;
        }
        h1 {
          margin: 0 auto;
          font-size: 50px;
          font-weight: normal;
          text-align: center;
        }
        .calculate {
          display: flex;
          align-items: center;
          margin: 20px;
          font-family: Righteous, cursive;
          font-size: 36px;
          font-weight: normal;
          color: ${theme.colors.white};
          text-decoration: none;
          text-align: center;
        }
        p {
          margin: 0 0 10px;
          font-size: 18px;
          line-height: 1.5;
        }

        @keyframes colorfade {
          0% {
            color: ${theme.colors.eutro};
          }
          20% {
            color: ${theme.colors.fuchsia};
          }
          40% {
            color: ${theme.colors.orange};
          }
          80% {
            color: ${theme.colors.ghg};
          }
          100% {
            color: ${theme.colors.eutro};
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          94%,
          97%,
          100% {
            transform: scale(1);
          }
          95.5%,
          98.5% {
            transform: scale(1.03);
          }
        }

        @media only screen and (min-width: ${theme.sizes.mobile}) {
          .front-page {
            max-width: 1320px;
            padding: 60px 40px 130px;
          }
          .headline {
            margin: 80px 0 20px;
          }
          h1 {
            font-size: 72px;
          }
          p {
            max-width: 700px;
            font-size: 22px;
          }
        }

        @media only screen and (min-width: ${theme.sizes.tablet}) {
          .front-page {
            padding: 60px 100px 130px;
          }
          .button-container {
            margin-top: 60px;
            padding: 0;
            width: 100%;
          }
          .utensils-container,
          .calc-container {
            font-size: 26px;
          }
          h1 {
            font-size: 104px;
          }
          h3 {
            font-size: 36px;
            text-align: center;
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
