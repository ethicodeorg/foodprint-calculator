import theme from '../styles/theme';
import ExternalLink from './ExternalLink';

const Layout = ({ children }) => (
  <div className="main">
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
        background-color: ${theme.colors.background};
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

export default Layout;
