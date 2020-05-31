import { useEffect } from 'react';
import Head from 'next/head';
import { initGA, logPageView } from '../utils/analytics';
import { FOODPRINT_CALCULATOR } from '../utils/constants';
import theme from '../styles/theme';
import ExternalLink from './ExternalLink';

const Layout = ({ children, title = '' }) => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  });
  const headTitle = title ? `${title} | ${FOODPRINT_CALCULATOR}` : FOODPRINT_CALCULATOR;

  return (
    <div className="main">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{headTitle}</title>
        <link href="https://fonts.googleapis.com/css?family=Nunito Sans" rel="stylesheet" />
      </Head>
      <div className="background" />
      {children}
      <div className="footer">
        <div>
          Powered by <span className="ethicode">Ethicode</span>
        </div>
        <div>
          <ExternalLink href="http://ethicode.org/">ethicode.org</ExternalLink>
        </div>
      </div>
      <style jsx>{`
        .main {
          min-height: 100vh;
          font-family: ${theme.fontFamily.default};
          color: ${theme.colors.text};
          background-color: transparent;
        }
        .background {
          position: fixed;
          height: 100vh;
          width: 100vw;
          z-index: -1;
          opacity: 0.85;
          background: url('/earth-cover.jpg') no-repeat 50%;
          background-size: cover;
        }
        .footer {
          display: flex;
          justify-content: space-between;
          padding: 40px;
          margin-top: 50px;
          background-color: ${theme.colors.darkBackground};
          color: #fff;
        }
        .ethicode {
          color: ${theme.colors.eutro};
          animation: colorfade 30s linear 0s infinite;
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
      `}</style>
    </div>
  );
};
export default Layout;
