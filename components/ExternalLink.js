import { FaExternalLinkAlt, FaEnvelopeOpen } from 'react-icons/fa';
import theme from '../styles/theme';

const ExternalLink = ({ href, children, color, email }) => (
  <a href={href} target="_blank">
    {children}
    <span>{email ? <FaEnvelopeOpen /> : <FaExternalLinkAlt />}</span>

    <style jsx>{`
      a {
        font-size: 14px;
        font-weight: normal;
        text-decoration: none;
        color: ${color || theme.colors.water};
      }
      a:hover {
        opacity: 0.7;
      }
      span {
        display: inline;
        margin-left: 5px;
        font-size: 12px;
      }

      @media only screen and (min-width: ${theme.sizes.mobile}) {
        a {
          font-size: 16px;
        }
      }
    `}</style>
  </a>
);

export default ExternalLink;
