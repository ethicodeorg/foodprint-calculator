import { useEffect } from 'react';
import Head from 'next/head';
import { FaCalculator } from 'react-icons/fa';
import { Link, withTranslation } from '../i18n';
import { initGA, logPageView } from '../utils/analytics';
import { splitTranslationWithLink, SPLITTER } from '../utils/translationUtils';
import theme from '../styles/theme';
import ExternalLink from './ExternalLink';
import Button from './Button';
import MyTooltip from './MyTooltip';

const Layout = ({ children, title = '', t, showFloater }) => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  });
  const headTitle = title ? `${title} | ${t('foodprint_calculator')}` : t('foodprint_calculator');
  const poweredBy = splitTranslationWithLink(t('powered_by', SPLITTER));

  return (
    <div className="main">
      <Head>
        <link rel="shortcut icon" href="/earth.png" />
        <title>{headTitle}</title>
        <link href="https://fonts.googleapis.com/css?family=Nunito Sans" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;1,500&family=Righteous&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="behind-background" />
      <div className="background" />
      {children}
      {showFloater && (
        <MyTooltip
          title={t('create_meal')}
          placement="top"
          arrow
          enterTouchDelay={0}
          leaveTouchDelay={3000}
        >
          <div className="create-button">
            <Button primary animate noPad round>
              <Link href="/newmeal">
                <a className="calculate">
                  <span className="calc-container">
                    <FaCalculator />
                  </span>
                </a>
              </Link>
            </Button>
          </div>
        </MyTooltip>
      )}
      <div className="footer">
        <div className="powered-by">
          {poweredBy.beforeLink}
          <img className="ethicode" src="/ethicode-logo-white.png" />
        </div>
        <div className="ethicode-link">
          <ExternalLink color={theme.colors.aqua} href="http://ethicode.org/">
            ethicode.org
          </ExternalLink>
        </div>
      </div>
      <style jsx>{`
        .main {
          position: relative;
          min-height: 100vh;
          font-family: ${theme.fontFamily.default};
          color: ${theme.colors.text};
          background-color: transparent;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: auto;
        }
        .behind-background {
          position: fixed;
          height: 100vh;
          width: 100vw;
          z-index: -2;
          background-color: #666;
        }
        .background {
          position: fixed;
          height: 100vh;
          width: 100vw;
          z-index: -1;
          opacity: 0.9;
          background: url('/earth-cover.jpg') no-repeat 50%;
          background-size: cover;
        }
        .create-button {
          position: fixed;
          bottom: 60px;
          right: calc(50% - 33px);
          z-index: 1;
          border-radius: 50%;
          box-shadow: 2px 2px 7px 1px rgba(0, 0, 0, 0.25);
        }
        .calculate {
          display: flex;
          align-items: center;
          margin: 20px;
          color: ${theme.colors.white};
        }
        .calc-container {
          display: flex;
          font-size: 26px;
        }
        .footer {
          position: absolute;
          bottom: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          background-color: ${theme.colors.darkBackground};
          color: #fff;
        }
        .powered-by,
        .ethicode-link {
          display: flex;
          flex-direction: column;
        }
        .powered-by {
          padding-left: 40px;
        }
        .ethicode-link {
          padding-right: 40px;
        }
        .ethicode {
          height: 30px;
        }

        @media only screen and (min-width: ${theme.sizes.mobile}) {
          .create-button {
            bottom: 70px;
            right: 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default withTranslation('common')(Layout);
