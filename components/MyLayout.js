import { useEffect } from 'react';
import Head from 'next/head';
import { withTranslation } from '../i18n';
import { initGA, logPageView } from '../utils/analytics';
import { splitTranslationWithLink, SPLITTER } from '../utils/translationUtils';
import theme from '../styles/theme';
import ExternalLink from './ExternalLink';

const Layout = ({ children, title = '', t }) => {
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
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{headTitle}</title>
        <link href="https://fonts.googleapis.com/css?family=Nunito Sans" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;1,500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="behind-background" />
      <div className="background" />
      {children}
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
          opacity: 0.6;
          background: url('/earth-cover.jpg') no-repeat 50%;
          background-size: cover;
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
      `}</style>
    </div>
  );
};

export default withTranslation('common')(Layout);
